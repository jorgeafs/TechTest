import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Models/company';
import { CompanyService } from 'src/app/Share/Services/Company/company.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/Share/Components/modal/modal.component';
import { Address } from 'src/app/Models/address';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  public displayedColumns: string[] = ['Name', 'City', 'Zip Code', 'Country', 'Delete'];
  public dataSource: Company[];
  constructor(private companySVC: CompanyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.LoadCompanies();
  }

  private LoadCompanies(): void {
    this.companySVC.GetCompanies().subscribe(companies => this.dataSource = companies);
  }

  public DeleteCompany(id: number, event: Event) {
    event.stopPropagation();
    this.companySVC.DeleteCompany(id).subscribe(data => this.LoadCompanies());
  }

  public OpenModal(company: Company): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '18rem',
      data: company
    });

    dialogRef.afterClosed().subscribe(result => {
      this.companySVC.PutCompany(result).subscribe(data => this.LoadCompanies());
    });
  }

  public CreationModal(): void {
    const newAddress: Address = {zipCode: '', country: '', city: ''};
    const company: Company = {name: '', address: newAddress};
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '18rem',
      data: company
    });

    dialogRef.afterClosed().subscribe(result => {
      this.companySVC.PostCompany(result).subscribe(data => this.LoadCompanies());
    });
  }
}
