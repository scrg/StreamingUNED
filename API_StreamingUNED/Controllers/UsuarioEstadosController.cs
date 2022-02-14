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
    public class UsuarioEstadosController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public UsuarioEstadosController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/TcUsuarioEstadoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioEstados>>> GetTcUsuarioEstados()
        {
            return await _context.UsuarioEstados.ToListAsync();
        }

        // GET: api/TcUsuarioEstadoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioEstados>> GetTcUsuarioEstado(int id)
        {
            var tcUsuarioEstado = await _context.UsuarioEstados.FindAsync(id);

            if (tcUsuarioEstado == null)
            {
                return NotFound();
            }

            return tcUsuarioEstado;
        }

        // PUT: api/TcUsuarioEstadoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTcUsuarioEstado(int id, UsuarioEstados tcUsuarioEstado)
        {
            if (id != tcUsuarioEstado.Id)
            {
                return BadRequest();
            }

            _context.Entry(tcUsuarioEstado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TcUsuarioEstadoExists(id))
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

        // POST: api/TcUsuarioEstadoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UsuarioEstados>> PostTcUsuarioEstado(UsuarioEstados tcUsuarioEstado)
        {
            _context.UsuarioEstados.Add(tcUsuarioEstado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTcUsuarioEstado", new { id = tcUsuarioEstado.Id }, tcUsuarioEstado);
        }

        // DELETE: api/TcUsuarioEstadoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTcUsuarioEstado(int id)
        {
            var tcUsuarioEstado = await _context.UsuarioEstados.FindAsync(id);
            if (tcUsuarioEstado == null)
            {
                return NotFound();
            }

            _context.UsuarioEstados.Remove(tcUsuarioEstado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TcUsuarioEstadoExists(int id)
        {
            return _context.UsuarioEstados.Any(e => e.Id == id);
        }
    }
}
