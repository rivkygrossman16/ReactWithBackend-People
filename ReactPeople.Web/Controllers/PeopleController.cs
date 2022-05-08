using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeople.data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
namespace ReactPeople.Web.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleDataRepo(_connectionString);
            return repo.GetAll();
        }

        [Route("addperson")]
        [HttpPost]
        public void Add(Person person)
        {
            var repo = new PeopleDataRepo(_connectionString);
            repo.Add(person);
        }

        [Route("deleteperson")]
        [HttpPost]
        public void Delete(Person person)
        {
            var repo = new PeopleDataRepo(_connectionString);
            repo.Delete(person.Id);
        }
        [Route("editperson")]
        [HttpPost]
        public void Edit(Person person)
        {
            var repo = new PeopleDataRepo(_connectionString);
            repo.Edit(person);
        }
        [Route("deletemany")]
        [HttpPost]
        public void DeleteMany(List<Person> people)
        {
            var repo = new PeopleDataRepo(_connectionString);
            people.ForEach(p => repo.Delete(p.Id));
        }

    }
}
  
