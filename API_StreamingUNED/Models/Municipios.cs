using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class Municipios
    {
        public Municipios()
        {
            Usuarios = new HashSet<Usuarios>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public int? FkProvincia { get; set; }
        public int? FkCcaa { get; set; }

        public virtual Ccaas FkCcaaNavigation { get; set; }
        public virtual Provincias FkProvinciaNavigation { get; set; }
        public virtual ICollection<Usuarios> Usuarios { get; set; }
    }
}
