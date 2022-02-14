using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class Ccaas
    {
        public Ccaas()
        {
            Usuarios = new HashSet<Usuarios>();
            Municipios = new HashSet<Municipios>();
            Provincias = new HashSet<Provincias>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Usuarios> Usuarios { get; set; }
        public virtual ICollection<Municipios> Municipios { get; set; }
        public virtual ICollection<Provincias> Provincias { get; set; }
    }
}
