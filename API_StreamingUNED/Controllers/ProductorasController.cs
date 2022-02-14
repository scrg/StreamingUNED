using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_StreamingUNED;

namespace API_StreamingUNED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductorasController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public ProductorasController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/Productoras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Productoras>>> GetProductoras()
        {
            return await _context.Productoras.ToListAsync();
        }

        // GET: api/Productoras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Productoras>> GetProductoras(int id)
        {
            var productoras = await _context.Productoras.FindAsync(id);

            if (productoras == null)
            {
                return NotFound();
            }

            return productoras;
        }

        // PUT: api/Productoras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductoras(int id, Productoras productoras)
        {
            if (id != productoras.Id)
            {
                return BadRequest();
            }

            _context.Entry(productoras).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductorasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Productoras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Productoras>> PostProductoras(Productoras productoras)
        {
            _context.Productoras.Add(productoras);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductoras", new { id = productoras.Id }, productoras);
        }

        // DELETE: api/Productoras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductoras(int id)
        {
            var productoras = await _context.Productoras.FindAsync(id);
            if (productoras == null)
            {
                return NotFound();
            }

            _context.Productoras.Remove(productoras);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductorasExists(int id)
        {
            return _context.Productoras.Any(e => e.Id == id);
        }
    }
}
