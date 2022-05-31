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
                return await _context.Contenidos.Include(x=>x.FkEstadoNavigation).ToListAsync();
            else
                return await _context.Contenidos.Include(x=>x.FkEstadoNavigation)
                          .Where(x => x.Titulo.Contains(search))
                    .ToListAsync();
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

                if (contenidos.CaratulaFile != null)
                    contenidos.Caratula = await SaveImage(contenidos.CaratulaFile); 
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
                if (contenidos.CaratulaFile!=null)
                    contenidos.Caratula = await SaveImage(contenidos.CaratulaFile) ;
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
        public   async Task<string> SaveImage(IFormFile imgFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imgFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imgFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath,"Caratulas", imageName);
            using(var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imgFile.CopyToAsync(fileStream);
            }
            return imageName;
        }      
    }
}
