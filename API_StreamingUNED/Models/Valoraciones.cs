using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class Valoraciones
    {
        public int FkSocio { get; set; }
        public int FkContenido { get; set; }
        public int Valoracion { get; set; }
        public DateTime Fecha { get; set; }

        public virtual Contenidos FkContenidoNavigation { get; set; }
        public virtual Usuarios FkSocioNavigation { get; set; }
    }
}
