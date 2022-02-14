using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class Productoras
    {
        public Productoras()
        {
            Contenidos = new HashSet<Contenidos>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Contenidos> Contenidos { get; set; }
    }
}
