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
    public class DirectoresController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public DirectoresController(UNED_streamingContext context)
        {
            _context = context;
        }

        //// GET: api/Directores
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Directores>>> GetDirectores()
        //{
        //    return await _context.Directores.ToListAsync();
        //}

        // GET: api/Directores
        // GET api/Directores?search=ped 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Directores>>> GetDirectores(string search)
        {
            if (string.IsNullOrEmpty(search))
                return await _context.Directores.ToListAsync();
            else
            return await _context.Directores
                      .Where(x => x.Nombre.Contains(search) || x.Apellido1.Contains(search) || x.Apellido2.Contains(search))
                .ToListAsync();
        }
         

        // GET: api/Directores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Directores>> GetDirectores(int id)
        {
            var directores = await _context.Directores.FindAsync(id);

            if (directores == null)
            {
                return NotFound();
            }

            return directores;
        }

        // PUT: api/Directores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDirectores(int id, Directores directores)
        {
            if (id != directores.Id)
            {
                return BadRequest();
            }

            _context.Entry(directores).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DirectoresExists(id))
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

        // POST: api/Directores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Directores>> PostDirectores(Directores directores)
        {
            _context.Directores.Add(directores);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDirectores", new { id = directores.Id }, directores);
        }

        // DELETE: api/Directores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDirectores(int id)
        {
            var directores = await _context.Directores.FindAsync(id);
            if (directores == null)
            {
                return NotFound();
            }

            _context.Directores.Remove(directores);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DirectoresExists(int id)
        {
            return _context.Directores.Any(e => e.Id == id);
        }
    }
}
