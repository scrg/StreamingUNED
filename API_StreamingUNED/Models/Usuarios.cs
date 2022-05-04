using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API_StreamingUNED
{
    public partial class Usuarios
    { 
        public Usuarios()
        {
            Visualizaciones = new HashSet<Visualizaciones>();
        }
         
        public int Id { get; set; }
        public int FkRol { get; set; }
        public int FkEstado { get; set; }
        [DataType(DataType.EmailAddress)]
        public string CorreoElectronico { get; set; }
        public string Nombre { get; set; }
        public string Apellido1 { get; set; }
        public string Apellido2 { get; set; }
        public string Direccion { get; set; }
        public int? FkMunicipio { get; set; }
        public int? FkProvincia { get; set; }
        public int? FkCcaa { get; set; }
        public string CodigoPostal { get; set; }

        [DataType(DataType.Password)]
        public string Clave { get; set; }
        public string CuentaBancaria { get; set; }

        public virtual Ccaas FkCcaaNavigation { get; set; }
        public virtual UsuarioEstados FkEstadoNavigation { get; set; }
        public virtual Municipios FkMunicipioNavigation { get; set; }
        public virtual Provincias FkProvinciaNavigation { get; set; }
        public virtual Roles FkRolNavigation { get; set; }
        public virtual ICollection<Visualizaciones> Visualizaciones { get; set; }
        public virtual ICollection<Valoraciones> Valoraciones { get; set; }
    }
}
