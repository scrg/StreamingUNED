using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class Directores
    {
        public Directores()
        {
            FkContenidos = new HashSet<Contenidos>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido1 { get; set; }
        public string Apellido2 { get; set; }
        public DateTime FechaNacimiento { get; set; }

        public virtual ICollection<Contenidos> FkContenidos { get; set; }
    }
}
