using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class ContenidoInterprete
    {
        public int FkInterprete { get; set; }
        public int FkContenido { get; set; }
        public int? Orden { get; set; }

        public virtual Contenidos FkContenidoNavigation { get; set; }
        public virtual Interpretes FkInterpreteNavigation { get; set; }
    }
}
