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
    public class ContenidosController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public ContenidosController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/Contenidos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contenidos>>> GetContenidos()
        {
            return await _context.Contenidos.ToListAsync();
        }



        [HttpGet("{tipo}/{tematica}")]
        public ActionResult<List<Contenidos>> GetContenidos(int tipo, int tematica)
        {
            var usuarios = _context.Contenidos.Where(x => (x.FkTipo== tipo || tipo == 0) && (x.FkTematica == tematica || tematica == 0)).ToList();

            //int idUsuario = Convert.ToInt16(HttpContext.User.Claims.ToList()[0].Value);

            if (usuarios == null)
            {
                return NotFound();
            }

            return usuarios;
        }

        // GET: api/Contenidos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contenidos>> GetContenidos(int id)
        {
            var contenidos = await _context.Contenidos.FindAsync(id);

            if (contenidos == null)
            {
                return NotFound();
            }

            return contenidos;
        }

        // PUT: api/Contenidos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContenidos(int id, Contenidos contenidos)
        {
            if (id != contenidos.Id)
            {
                return BadRequest();
            }

            _context.Entry(contenidos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContenidosExists(id))
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

        // POST: api/Contenidos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contenidos>> PostContenidos(Contenidos contenidos)
        {
            _context.Contenidos.Add(contenidos);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ContenidosExists(contenidos.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetContenidos", new { id = contenidos.Id }, contenidos);
        }

        // DELETE: api/Contenidos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContenidos(int id)
        {
            var contenidos = await _context.Contenidos.FindAsync(id);
            if (contenidos == null)
            {
                return NotFound();
            }

            _context.Contenidos.Remove(contenidos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContenidosExists(int id)
        {
            return _context.Contenidos.Any(e => e.Id == id);
        }
    }
}
