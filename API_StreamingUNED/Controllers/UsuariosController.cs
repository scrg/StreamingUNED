using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using API_StreamingUNED;
using System.Net;

namespace API_StreamingUNED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public UsuariosController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuarios>>> GetUsuarios(string search, int idRol, int idEstado)
        {
            return await _context.Usuarios
                .Include(x => x.FkEstadoNavigation)
                .Include(x => x.FkRolNavigation)
                  .Where(x => string.IsNullOrEmpty(search) || x.Nombre.Contains(search) || x.Apellido1.Contains(search) || x.Apellido2.Contains(search))
                  .Where(x => idRol == 0 || x.FkRol == idRol)
                  .Where(x => idEstado == 0 || x.FkEstado == idEstado)
                .ToListAsync();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuarios>> GetUsuario(int id)
        {
            var Usuario = await _context.Usuarios.FindAsync(id);

            if (Usuario == null)
            {
                return NotFound();
            }

            return Usuario;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuarios Usuario)
        {
            if (id != Usuario.Id)
            {
                return BadRequest();
            }

            _context.Entry(Usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Usuarios>> PostUsuario(Usuarios Usuario)
        {
            _context.Usuarios.Add(Usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = Usuario.Id }, Usuario);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var Usuario = await _context.Usuarios.FindAsync(id);
            if (Usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(Usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("{username}/{password}")]
        public ActionResult<List<Usuarios>> GetIniciarSesion(string username, string password)
        {
            var usuarios = _context.Usuarios.Where(x => x.CorreoElectronico.Equals(username) && x.Clave.Equals(password)).ToList();

            if (usuarios == null)
            {
                return NotFound();
            }

            return usuarios;
        }
         
         
        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }


        [HttpGet]
        [Route("Activar")]
        // GET: api/usuarios/Activar
        public async Task<IActionResult> Activar()
        {
            var user = _context.Usuarios.Find(1);
            user.FkEstado = (int)EstadosUsuario.Activo;
            await _context.SaveChangesAsync();

            return NoContent();

        }
        [HttpPut]
        [Route("CambiarEstado/{id}/{idEstado}")]
        // GET: api/usuarios/CambiarEstado/2/2
        public async Task<IActionResult> CambiarEstado(int id, int idEstado)
        {
            var user = _context.Usuarios.Find(id);
            user.FkEstado = idEstado;
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}
