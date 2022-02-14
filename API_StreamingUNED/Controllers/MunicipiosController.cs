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
    public class MunicipiosController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public MunicipiosController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/Municipios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Municipios>>> GetMunicipios()
        {
            return await _context.Municipios.ToListAsync();
        }

        // GET: api/Municipios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Municipios>> GetMunicipios(int id)
        {
            var municipios = await _context.Municipios.FindAsync(id);

            if (municipios == null)
            {
                return NotFound();
            }

            return municipios;
        }

        // PUT: api/Municipios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMunicipios(int id, Municipios municipios)
        {
            if (id != municipios.Id)
            {
                return BadRequest();
            }

            _context.Entry(municipios).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MunicipiosExists(id))
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

        // POST: api/Municipios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Municipios>> PostMunicipios(Municipios municipios)
        {
            _context.Municipios.Add(municipios);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMunicipios", new { id = municipios.Id }, municipios);
        }

        // DELETE: api/Municipios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMunicipios(int id)
        {
            var municipios = await _context.Municipios.FindAsync(id);
            if (municipios == null)
            {
                return NotFound();
            }

            _context.Municipios.Remove(municipios);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MunicipiosExists(int id)
        {
            return _context.Municipios.Any(e => e.Id == id);
        }
    }
}
