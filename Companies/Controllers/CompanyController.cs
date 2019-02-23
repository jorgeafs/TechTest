using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Companies.Models;

namespace Companies.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly CompaniesContext context;

        public CompanyController(CompaniesContext context)
        {
            this.context = context;

            //It creates a new collection if the collections is empty, no empty view
            if(this.context.Companies.Count() == 0) 
            {
                this.context.Addresses.Add(new Address{ZipCode="Some code", Country ="EEUU", City="Mills Run" });
                this.context.Addresses.Add(new Address{ZipCode="Some code1", Country ="EEUU", City="Mills Run" });
                this.context.Addresses.Add(new Address{ZipCode="Some code2", Country ="EEUU", City="Mills Run" });
                this.context.Companies.Add(new Company { Name = "Weyland-Yutani", Address = this.context.Addresses.Find((long)1) });
                this.context.Companies.Add(new Company { Name = "Jeb Kerman's furniture", Address = this.context.Addresses.Find((long)2)});
                this.context.Companies.Add(new Company { Name = "The Boring Company", Address = this.context.Addresses.Find((long)3)});
                this.context.SaveChanges();
            }
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            var companies = await this.context.Companies.ToListAsync();
            companies.ForEach(company => this.context.Addresses.FindAsync(company.AddressID));
            return companies;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(long id)
        {
            var company = await this.context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            } else {
            company.Address = await this.context.Addresses.FindAsync(company.AddressID);
            }
            return company;
        }

        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany (Company company)
        {
            this.context.Addresses.Add(company.Address);
            this.context.Companies.Add(company);        
            await this.context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCompany), new { id = company.ID }, company);
        }

        [HttpPut]
        public async Task<ActionResult<Company>> PutCompany (Company company)
        {
            this.context.Companies.Update(company);                  
            await this.context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompany), new { id = company.ID }, company);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(long id)
        {
            var company = await this.context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            var address = await this.context.Addresses.FindAsync(company.AddressID);
            this.context.Companies.Remove(company);
            this.context.Addresses.Remove(address);
            await this.context.SaveChangesAsync();

            return NoContent();
        }
    }
}