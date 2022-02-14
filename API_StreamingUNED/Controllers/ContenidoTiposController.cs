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
    public class ContenidoTiposController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public ContenidoTiposController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/ContenidoTipos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContenidoTipos>>> GetContenidoTipos()
        {
            return await _context.ContenidoTipos.ToListAsync();
        }

        // GET: api/ContenidoTipos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContenidoTipos>> GetContenidoTipos(int id)
        {
            var contenidoTipos = await _context.ContenidoTipos.FindAsync(id);

            if (contenidoTipos == null)
            {
                return NotFound();
            }

            return contenidoTipos;
        }

        // PUT: api/ContenidoTipos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContenidoTipos(int id, ContenidoTipos contenidoTipos)
        {
            if (id != contenidoTipos.Id)
            {
                return BadRequest();
            }

            _context.Entry(contenidoTipos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContenidoTiposExists(id))
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

        // POST: api/ContenidoTipos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ContenidoTipos>> PostContenidoTipos(ContenidoTipos contenidoTipos)
        {
            _context.ContenidoTipos.Add(contenidoTipos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContenidoTipos", new { id = contenidoTipos.Id }, contenidoTipos);
        }

        // DELETE: api/ContenidoTipos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContenidoTipos(int id)
        {
            var contenidoTipos = await _context.ContenidoTipos.FindAsync(id);
            if (contenidoTipos == null)
            {
                return NotFound();
            }

            _context.ContenidoTipos.Remove(contenidoTipos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContenidoTiposExists(int id)
        {
            return _context.ContenidoTipos.Any(e => e.Id == id);
        }
    }
}
