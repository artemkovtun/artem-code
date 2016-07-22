using ProductsStore.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.OData;

namespace ProductsStore.WebAPI.Controllers
{
    [EnableCorsAttribute("http://localhost:15651", "*", "*")]
    public class ProductsController : ApiController
    {
        // GET: api/Products
        [EnableQuery]
        public IQueryable<Product> Get()
        {
            var repository = new ProductRepository();
            return repository.Retrieve().AsQueryable<Product>();
        }

        //public IEnumerable<Product> Get(string search)
        //{
        //    var repository = new ProductRepository();
        //    var products = repository.Retrieve();
        //    return products.Where(p => p.ProductCode.Contains(search));
        //}

        // GET: api/Products/5
        
        public Product Get(int id)
        {
            Product product;
            var productRepository = new ProductRepository();
            if (id > 0)
            {
                var products = productRepository.Retrieve();
                product = products.FirstOrDefault(p => p.ProductId == id);
            }
            else
            {
                product = productRepository.Create();
            }
            return product;
        }

        // POST: api/Products
        public void Post([FromBody]Product product)
        {
            var productRepository = new ProductRepository();
            var newProduct = productRepository.Save(product);
        }

        // PUT: api/Products/5
        public void Put(int id, [FromBody]Product product)
        {
            var productRepository = new ProductRepository();
            var updatedProduct = productRepository.Save(id, product);
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
            var productRepository = new ProductRepository();
            productRepository.Delete(id);
        }
    }
}
