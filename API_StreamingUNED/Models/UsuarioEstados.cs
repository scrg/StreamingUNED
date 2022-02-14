using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class UsuarioEstados
    {
        public UsuarioEstados()
        {
            Usuarios = new HashSet<Usuarios>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Usuarios> Usuarios { get; set; }
    }
}
