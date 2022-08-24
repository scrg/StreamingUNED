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
    public class VisualizacionesController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public VisualizacionesController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/Visualizaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Visualizaciones>>> GetVisualizaciones()
        {            
            return await _context.Visualizaciones
                .Include(x => x.FkContenidoNavigation)
                .Include(x => x.FkContenidoNavigation.FkTematicaNavigation)
                .Include(x => x.FkContenidoNavigation.FkTipoNavigation)
                .ToListAsync();
        }
        
       [HttpGet]
        [Route("GetHistorico")]
        // GET: api/Visualizaciones/GetHistorico
        public async Task<ActionResult<IEnumerable<Visualizaciones>>> GetHistorico()
        {
            int idUsuario = Convert.ToInt16(HttpContext.User.Claims.ToList()[0].Value);
            return await _context.Visualizaciones
                .Include(x => x.FkContenidoNavigation)
                .Where(x => x.FkSocio == idUsuario)
                .OrderByDescending(x => x.Fecha)
                .ToListAsync();
        }

        [HttpGet]
        [Route("GetInformeVisualizaciones")]
        // GET: api/Visualizaciones/GetInformeVisualizaciones
        public async Task<ActionResult<IEnumerable<Visualizaciones>>> GetInformeVisualizaciones()
        { 
            return await _context.Visualizaciones
                .Include(x => x.FkSocioNavigation)
                .Include(x => x.FkContenidoNavigation)
                .Include(x => x.FkContenidoNavigation.FkTematicaNavigation)
                .Include(x => x.FkContenidoNavigation.FkTipoNavigation)
                .ToListAsync();
        }

        // GET: api/Visualizaciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Visualizaciones>> GetVisualizaciones(int id)
       {
            var visualizaciones = await _context.Visualizaciones.FindAsync(id);

            if (visualizaciones == null)
            {
                return NotFound();
            }

            return visualizaciones;
        }

        // PUT: api/Visualizaciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVisualizaciones(int id, Visualizaciones visualizaciones)
        {
            if (id != visualizaciones.Id)
            {
                return BadRequest();
            }

            _context.Entry(visualizaciones).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VisualizacionesExists(id))
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

        // POST: api/Visualizaciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Visualizaciones>> PostVisualizaciones(Visualizaciones visualizaciones)
        {

            int idUsuario = Convert.ToInt16(HttpContext.User.Claims.ToList()[0].Value);
            visualizaciones.FkSocio = idUsuario;
            visualizaciones.Fecha = DateTime.Now;
            _context.Visualizaciones.Add(visualizaciones);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVisualizaciones", new { id = visualizaciones.Id }, visualizaciones);
        }

        // DELETE: api/Visualizaciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVisualizaciones(int id)
        {
            var visualizaciones = await _context.Visualizaciones.FindAsync(id);
            if (visualizaciones == null)
            {
                return NotFound();
            }

            _context.Visualizaciones.Remove(visualizaciones);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VisualizacionesExists(int id)
        {
            return _context.Visualizaciones.Any(e => e.Id == id);
        }
    }
}
