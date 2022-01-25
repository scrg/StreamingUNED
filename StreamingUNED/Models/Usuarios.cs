using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_UNED.Models
{
    [Table("T_USUARIOS")]
    public class Usuarios
    {
        [Key]
        public int id { get; set; }
        public string correoElectronico { get; set; }
        public string nombre { get; set; }
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public string direccion { get; set; }
        public int fk_municipio { get; set; }
        public int fk_provincia { get; set; }
        public string codigoPostal { get; set; }
        public string clave { get; set; }
        public string cuentaBancaria { get; set; }
    }
}
