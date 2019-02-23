namespace Companies.Models
{
    public class Company
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }     
        public long AddressID { get; set; }
    }
}