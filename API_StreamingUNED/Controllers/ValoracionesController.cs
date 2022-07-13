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
    public class ValoracionesController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public ValoracionesController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/Valoraciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Valoraciones>>> GetValoraciones()
        {
            return await _context.Valoraciones.ToListAsync();
        }
        // GET: api/Valoraciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Valoraciones>> GetValoraciones(int id)
        {
            int idUsuario = Convert.ToInt16(HttpContext.User.Claims.ToList()[0].Value);
            var Valoraciones = await _context.Valoraciones.FindAsync(idUsuario, id);

            if (Valoraciones == null)
            {
                return NotFound();
            }

            return Valoraciones;
        }

        // PUT: api/Valoraciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutValoraciones(int idContenido, int idSocio, Valoraciones Valoraciones)
        { 
            if (idContenido != Valoraciones.FkContenido && idSocio != Valoraciones.FkSocio)
            {
                return BadRequest();
            }

            _context.Entry(Valoraciones).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            { 
                    throw; 
            }

            return NoContent();
        }

        // POST: api/Valoraciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Valoraciones>> PostValoraciones(Valoraciones Valoraciones)
        {

            int idUsuario = Convert.ToInt16(HttpContext.User.Claims.ToList()[0].Value);
            Valoraciones.FkSocio = idUsuario;
            Valoraciones.Fecha = DateTime.Now;
            if (!ValoracionesExists(Valoraciones.FkContenido, Valoraciones.FkSocio))
            {
                _context.Valoraciones.Add(Valoraciones);    
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetValoraciones", new { id = Valoraciones.FkContenido }, Valoraciones);
            }
            else
            {
                await PutValoraciones(Valoraciones.FkContenido, Valoraciones.FkSocio, Valoraciones);
                return NoContent();
            }            
        }

        private bool ValoracionesExists(int idContenido, int idSocio)
        { 
            return _context.Valoraciones.Any(e => e.FkContenido == idContenido && e.FkSocio == idSocio);
        }

    }
}
