using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_StreamingUNED;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace API_StreamingUNED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContenidosController : ControllerBase
    {
        private readonly UNED_streamingContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ContenidosController(UNED_streamingContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }


        // GET api/Directores?search=ped 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contenidos>>> GetContenidos(string search)
        {
            if (string.IsNullOrEmpty(search))
                return await _context.Contenidos
                    .Include(x => x.FkEstadoNavigation)
                    .Include(x => x.FkTipoNavigation)
                    .Include(x => x.FkTematicaNavigation)
                    .Include(x => x.ContenidoInterpretes)
                    .Include(x => x.ContenidoDirectores)
                    .ToListAsync();
            else
                return await _context.Contenidos
                    .Include(x => x.FkEstadoNavigation)
                    .Include(x => x.FkTipoNavigation)
                    .Include(x => x.FkTematicaNavigation)
                    .Include(x => x.ContenidoInterpretes)
                    .Include(x => x.ContenidoDirectores)
                    .Where(x => x.Titulo.Contains(search))
                    .ToListAsync();
        }


        [HttpGet]
        [Route("GetTopVisualizaciones")]
        // GET: api/Contenidos/GetTopVisualizaciones
        public async Task<ActionResult<IEnumerable<Contenidos>>> GetTopVisualizaciones()
        {
            return await _context.Contenidos
                .Where(x => x.FkEstado == (int)EstadosContenido.Activo)
                .OrderByDescending(x => x.Visualizaciones.Count)
                .ToListAsync();
        }

        [HttpGet]
        [Route("GetTopValoraciones")]
        // GET: api/Contenidos/GetTopValoraciones
        public async Task<ActionResult<IEnumerable<Contenidos>>> GetTopValoraciones()
        {
            return await _context.Contenidos
                .Where(x => x.FkEstado == (int)EstadosContenido.Activo)
                .OrderByDescending(x => x.Valoraciones.Average(c=>c.Valoracion))
                .ToListAsync();
        }


        [HttpGet]
        [Route("GetTopRecientes")]
        // GET: api/Contenidos/GetTopRecientes
        public async Task<ActionResult<IEnumerable<Contenidos>>> GetTopRecientes()
        {
            return await _context.Contenidos
                .Where(x => x.FkEstado == (int)EstadosContenido.Activo)
                .OrderByDescending(x => x.Fecha)
                .ToListAsync();
        }


        [HttpGet]
        [Route("GetRecomendacionesVisualizaciones")]
        // GET: api/Contenidos/GetRecomendacionesVisualizaciones
        public ActionResult<IEnumerable<Contenidos>> GetRecomendacionesVisualizaciones()
        {
            int idUsuario = Convert.ToInt16(HttpContext.User.Claims.ToList()[0].Value);

            try
            {


                var res = from u in _context.Visualizaciones
                          join p in _context.Visualizaciones on u.FkContenido equals p.FkContenido
                          where u.FkSocio == 1 && p.FkSocio != 1
                          group p by p.FkSocio into r
                          select new
                          {
                              idSocio = r.Key,
                              rank = r.Count()
                          };

                var afinidad =
                       (from cte in res
                        join similar in _context.Visualizaciones on cte.idSocio equals similar.FkSocio
                        where !_context.Visualizaciones.Where(x => x.FkSocio == 1).Select(x => x.FkContenido).Distinct().Contains(similar.FkContenido)
                        select new
                        {
                            rank = cte.rank,
                            idContenido = similar.FkContenido
                        }
                       ).ToList();

                var groupRank =
                    (from a in afinidad
                     group a by a.idContenido into r
                     select new
                     {
                         idContenido = r.Key,
                         rank = r.Sum(x => x.rank)
                     }
                       ).OrderByDescending(x => x.rank).ToList();

                return (from g in groupRank
                        join c in _context.Contenidos on g.idContenido equals c.Id
                        select new { g, c }
                       ).OrderByDescending(x => x.g.rank).Select(x => x.c).ToList();

            }
            catch (Exception e)
            {
                Console.Write(e);
                return NotFound();
            }
        }


        


        [HttpGet("{tipo}/{tematica}")]
        public ActionResult<List<Contenidos>> GetContenidos(int tipo, int tematica)
        {
            var usuarios = _context.Contenidos
                .Where(x => (x.FkTipo== tipo || tipo == 0) && (x.FkTematica == tematica || tematica == 0))
                .Where(x => x.FkEstado == (int)EstadosContenido.Activo)
                .ToList();

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
            var contenidos = await _context.Contenidos
                    .Include(x => x.ContenidoDirectores)
                    .Include(x => x.ContenidoInterpretes)
                    .FirstOrDefaultAsync(x => x.Id == id);

            if (contenidos == null)
            {
                return NotFound();
            }

            return contenidos;
        }

        // PUT: api/Contenidos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContenidos(int id, [FromForm] Contenidos contenidos)
        {
            if (id != contenidos.Id)
            {
                return BadRequest();
            }

            _context.Entry(contenidos).State = EntityState.Modified;

            try
            {

                if (contenidos.CaratulaFile != null)
                    contenidos.Caratula = await SaveImage(contenidos.CaratulaFile);
                if (contenidos.contenidoDirectoresStr.Length > 0)
                {
                    foreach (string d in contenidos.contenidoDirectoresStr.Split(','))
                    {
                        int dir = Convert.ToInt32(d);
                        contenidos.ContenidoDirectores.Add(new ContenidoDirector() { FkDirector = dir });
                    }
                }
                if (contenidos.contenidoInterpretesStr.Length > 0)
                {
                    foreach (string d in contenidos.contenidoInterpretesStr.Split(','))
                    {
                        int inte = Convert.ToInt32(d);
                        contenidos.ContenidoInterpretes.Add(new ContenidoInterprete() { FkInterprete = inte });
                    }
                }
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
        public async Task<ActionResult<Contenidos>> PostContenidos([FromForm]Contenidos contenidos)
        {
            try
            {
                if (contenidos.CaratulaFile != null)
                    contenidos.Caratula = await SaveImage(contenidos.CaratulaFile);
                if (contenidos.RecursoFile != null)
                    contenidos.Recurso = await SaveVideo(contenidos.RecursoFile);
                if (contenidos.contenidoDirectoresStr.Length > 0)
                {
                    foreach (string d in contenidos.contenidoDirectoresStr.Split(','))
                    {
                        int dir = Convert.ToInt32(d);
                        contenidos.ContenidoDirectores.Add(new ContenidoDirector() { FkDirector = dir });
                    }
                }
                if (contenidos.contenidoInterpretesStr.Length > 0)
                {
                    foreach (string d in contenidos.contenidoInterpretesStr.Split(','))
                    {
                        int inte = Convert.ToInt32(d);
                        contenidos.ContenidoInterpretes.Add(new ContenidoInterprete() { FkInterprete = inte });
                    }
                }
                _context.Contenidos.Add(contenidos); 

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                if (ContenidosExists(contenidos.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw e;
                }
            }

            return StatusCode(201);
            //return CreatedAtAction("GetContenidos", new { id = contenidos.Id }, contenidos);
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

        [NonAction]
        public async Task<string> SaveImage(IFormFile imgFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imgFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imgFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Caratulas", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imgFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public async Task<string> SaveVideo(IFormFile videoFile)
        {
            string videoName = new String(Path.GetFileNameWithoutExtension(videoFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            videoName = videoName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(videoFile.FileName);
            var videoPath = Path.Combine(_hostEnvironment.ContentRootPath, "Videos", videoName);
            using (var fileStream = new FileStream(videoPath, FileMode.Create))
            {
                await videoFile.CopyToAsync(fileStream);
            }
            return videoName;
        }
    }
}
