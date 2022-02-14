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
    public class CcaasController : ControllerBase
    {
        private readonly UNED_streamingContext _context;

        public CcaasController(UNED_streamingContext context)
        {
            _context = context;
        }

        // GET: api/Ccaas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ccaas>>> GetTcCcaas()
        {
            return await _context.Ccaas.ToListAsync();
        }

        // GET: api/Ccaas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ccaas>> GetCcaas(int id)
        {
            var ccaas = await _context.Ccaas.FindAsync(id);

            if (ccaas == null)
            {
                return NotFound();
            }

            return ccaas;
        }

        // PUT: api/Ccaas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCcaas(int id, Ccaas ccaas)
        {
            if (id != ccaas.Id)
            {
                return BadRequest();
            }

            _context.Entry(ccaas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CcaasExists(id))
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

        // POST: api/Ccaas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ccaas>> PostCcaas(Ccaas ccaas)
        {
            _context.Ccaas.Add(ccaas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCcaas", new { id = ccaas.Id }, ccaas);
        }

        // DELETE: api/Ccaas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCcaas(int id)
        {
            var ccaas = await _context.Ccaas.FindAsync(id);
            if (ccaas == null)
            {
                return NotFound();
            }

            _context.Ccaas.Remove(ccaas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CcaasExists(int id)
        {
            return _context.Ccaas.Any(e => e.Id == id);
        }
    }
}
