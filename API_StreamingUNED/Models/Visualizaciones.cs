using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class Visualizaciones
    {
        public int Id { get; set; }
        public int FkContenido { get; set; }
        public bool? Valoracion { get; set; }
        public int FkSocio { get; set; }
        public DateTime? Fecha { get; set; }

        public virtual Contenidos FkContenidoNavigation { get; set; }
        public virtual Usuarios FkSocioNavigation { get; set; }
    }
}
