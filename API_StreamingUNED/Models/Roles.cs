using System;
using System.Collections.Generic;

namespace API_StreamingUNED
{
    public partial class Roles
    {
        public Roles()
        {
            Usuarios = new HashSet<Usuarios>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Usuarios> Usuarios { get; set; }

        public enum Role
        {
            Gestor,
            Empleado,
            Socio
        }
    }
}
