using API_StreamingUNED.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API_StreamingUNED
{
    public partial class Directores
    {
        public Directores()
        {
            ContenidoDirectores = new HashSet<ContenidoDirector>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido1 { get; set; }
        public string Apellido2 { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        [JsonIgnore]
        public virtual ICollection<ContenidoDirector> ContenidoDirectores { get; set; }
        public string NombreCompleto
        {
            get
            {
                return String.Join(" ", new String[] { this.Nombre, this.Apellido1, this.Apellido2 });
            }
        }
    }
}
