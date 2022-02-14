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
    public class InterpretesController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public InterpretesController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/Interpretes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Interpretes>>> GetInterpretes()
        {
            return await _context.Interpretes.ToListAsync();
        }

        // GET: api/Interpretes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Interpretes>> GetInterpretes(int id)
        {
            var interpretes = await _context.Interpretes.FindAsync(id);

            if (interpretes == null)
            {
                return NotFound();
            }

            return interpretes;
        }

        // PUT: api/Interpretes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInterpretes(int id, Interpretes interpretes)
        {
            if (id != interpretes.Id)
            {
                return BadRequest();
            }

            _context.Entry(interpretes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InterpretesExists(id))
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

        // POST: api/Interpretes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Interpretes>> PostInterpretes(Interpretes interpretes)
        {
            _context.Interpretes.Add(interpretes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInterpretes", new { id = interpretes.Id }, interpretes);
        }

        // DELETE: api/Interpretes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInterpretes(int id)
        {
            var interpretes = await _context.Interpretes.FindAsync(id);
            if (interpretes == null)
            {
                return NotFound();
            }

            _context.Interpretes.Remove(interpretes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InterpretesExists(int id)
        {
            return _context.Interpretes.Any(e => e.Id == id);
        }
    }
}
