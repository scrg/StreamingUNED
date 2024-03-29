﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API_StreamingUNED
{
    public partial class ContenidoTipos
    {
        public ContenidoTipos()
        {
            Contenidos = new HashSet<Contenidos>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        [JsonIgnore]
        public virtual ICollection<Contenidos> Contenidos { get; set; }
    }
}
