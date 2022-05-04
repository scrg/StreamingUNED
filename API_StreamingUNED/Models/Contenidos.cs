using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API_StreamingUNED
{
    public partial class Contenidos
    {
        public Contenidos()
        {
            Visualizaciones = new HashSet<Visualizaciones>();
            FkDirectors = new HashSet<Directores>();
            FkInterpretes = new HashSet<Interpretes>();
        }

        public int Id { get; set; }
        public int FkEstado { get; set; }
        public string Identificador { get; set; }
        public int FkTipo { get; set; }
        public string Título { get; set; }
        public int? FkProductora { get; set; }
        public int? AnyoEstreno { get; set; }
        [DataType(DataType.Date)]
        public DateTime? Fecha { get; set; }
        public int? FkTematica { get; set; }
        public int? Duracion { get; set; }

        [DataType(DataType.ImageUrl)]
        public string Caratula { get; set; }
        public string Recurso { get; set; }

        public virtual ContenidoEstados FkEstadoNavigation { get; set; }
        public virtual Productoras FkProductoraNavigation { get; set; }
        public virtual ContenidoTematicas FkTematicaNavigation { get; set; }
        public virtual ContenidoTipos FkTipoNavigation { get; set; }
        public virtual ICollection<Visualizaciones> Visualizaciones { get; set; }
        public virtual ICollection<Valoraciones> Valoraciones { get; set; }

        public virtual ICollection<Directores> FkDirectors { get; set; }
        public virtual ICollection<Interpretes> FkInterpretes { get; set; }
    }
}
