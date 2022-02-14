using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class Provincias
    {
        public Provincias()
        {
            Usuarios = new HashSet<Usuarios>();
            Municipios = new HashSet<Municipios>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public int? FkCcaa { get; set; }

        public virtual Ccaas FkCcaaNavigation { get; set; }
        public virtual ICollection<Usuarios> Usuarios { get; set; }
        public virtual ICollection<Municipios> Municipios { get; set; }
    }
}
