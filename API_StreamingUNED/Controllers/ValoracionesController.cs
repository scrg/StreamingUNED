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

        // GET: api/Valoraciones/5/1
        [HttpGet("{socio}/{contenido}")] 
        public List<Valoraciones> GetValoraciones(int socio, int contenido)
        {
            var Valoraciones = _context.Valoraciones.Where(x=>x.FkSocio ==socio && x.FkContenido==contenido).ToList();

            if (Valoraciones == null)
            {
                return null;
            }
            return Valoraciones;
        }


    }
}
