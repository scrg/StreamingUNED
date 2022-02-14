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
    public class ContenidoTematicasController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public ContenidoTematicasController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/ContenidoTematicas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContenidoTematicas>>> GetContenidoTematicas()
        {
            return await _context.ContenidoTematicas.ToListAsync();
        }

        // GET: api/ContenidoTematicas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContenidoTematicas>> GetContenidoTematicas(int id)
        {
            var contenidoTematicas = await _context.ContenidoTematicas.FindAsync(id);

            if (contenidoTematicas == null)
            {
                return NotFound();
            }

            return contenidoTematicas;
        }

        // PUT: api/ContenidoTematicas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContenidoTematicas(int id, ContenidoTematicas contenidoTematicas)
        {
            if (id != contenidoTematicas.Id)
            {
                return BadRequest();
            }

            _context.Entry(contenidoTematicas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContenidoTematicasExists(id))
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

        // POST: api/ContenidoTematicas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ContenidoTematicas>> PostContenidoTematicas(ContenidoTematicas contenidoTematicas)
        {
            _context.ContenidoTematicas.Add(contenidoTematicas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContenidoTematicas", new { id = contenidoTematicas.Id }, contenidoTematicas);
        }

        // DELETE: api/ContenidoTematicas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContenidoTematicas(int id)
        {
            var contenidoTematicas = await _context.ContenidoTematicas.FindAsync(id);
            if (contenidoTematicas == null)
            {
                return NotFound();
            }

            _context.ContenidoTematicas.Remove(contenidoTematicas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContenidoTematicasExists(int id)
        {
            return _context.ContenidoTematicas.Any(e => e.Id == id);
        }
    }
}
