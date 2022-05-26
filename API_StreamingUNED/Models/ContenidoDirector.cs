using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API_StreamingUNED
{
    public partial class ContenidoDirector
    {
        public int FkDirector { get; set; }
        public int FkContenido { get; set; }
        public int? Orden { get; set; }
        [JsonIgnore]
        public virtual Contenidos FkContenidoNavigation { get; set; }
        [JsonIgnore]
        public virtual Directores FkDirectorNavigation { get; set; }
    }
}
