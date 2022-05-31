using API_StreamingUNED.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_StreamingUNED
{
    public partial class Contenidos
    {
        public Contenidos()
        {
            Valoraciones = new HashSet<Valoraciones>();
            Visualizaciones = new HashSet<Visualizaciones>();
            ContenidoDirectores = new HashSet<ContenidoDirector>();
            ContenidoInterpretes = new HashSet<ContenidoInterprete>();
        }

        public int Id { get; set; }
        public int FkEstado { get; set; }
        public string Identificador { get; set; }
        public int FkTipo { get; set; }
        public string Titulo { get; set; } 
        public int? FkProductora { get; set; } 
        public DateTime? Fecha { get; set; }
        public int? FkTematica { get; set; }
        public int? Duracion { get; set; }
        public string Caratula { get; set; }
        [NotMapped]
        public IFormFile CaratulaFile { get; set; }
        public string Recurso { get; set; }
    
        public virtual ContenidoEstados FkEstadoNavigation { get; set; }
        public virtual Productoras FkProductoraNavigation { get; set; }
        public virtual ContenidoTematicas FkTematicaNavigation { get; set; }
        public virtual ContenidoTipos FkTipoNavigation { get; set; }
        public virtual ICollection<Valoraciones> Valoraciones { get; set; }
        public virtual ICollection<Visualizaciones> Visualizaciones { get; set; }
        public virtual ICollection<ContenidoDirector> ContenidoDirectores { get; set; }
        public virtual ICollection<ContenidoInterprete> ContenidoInterpretes { get; set; }
    }
}
