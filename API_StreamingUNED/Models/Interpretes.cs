using API_StreamingUNED.Models;
using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class Interpretes
    {
        public Interpretes()
        {
            ContenidoInterpretes = new HashSet<ContenidoInterprete>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido1 { get; set; }
        public string Apellido2 { get; set; }
        public DateTime? FechaNacimiento { get; set; }

        public virtual ICollection<ContenidoInterprete> ContenidoInterpretes { get; set; }
        
        public string NombreCompleto
        {
            get
            {
                return String.Join(" ", new String[] { this.Nombre, this.Apellido1, this.Apellido2 });
            }
        }
    }
}
