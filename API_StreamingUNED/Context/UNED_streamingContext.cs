using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API_StreamingUNED
{
    public partial class UNED_streamingContext : DbContext
    {
        public UNED_streamingContext()
        {
        }

        public UNED_streamingContext(DbContextOptions<UNED_streamingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Contenidos> Contenidos { get; set; }
        public virtual DbSet<Directores> Directores { get; set; }
        public virtual DbSet<Interpretes> Interpretes { get; set; }
        public virtual DbSet<Productoras> Productoras { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }
        public virtual DbSet<Valoraciones> Valoraciones { get; set; }
        public virtual DbSet<Visualizaciones> Visualizaciones { get; set; }
        public virtual DbSet<Ccaas> Ccaas { get; set; }
        public virtual DbSet<ContenidoEstados> ContenidoEstados { get; set; }
        public virtual DbSet<ContenidoTematicas> ContenidoTematicas { get; set; }
        public virtual DbSet<ContenidoTipos> ContenidoTipos { get; set; }
        public virtual DbSet<Municipios> Municipios { get; set; }
        public virtual DbSet<Provincias> Provincias { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<UsuarioEstados> UsuarioEstados { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            { 
                optionsBuilder.UseSqlServer("Server=PC-SCRG\\SCRG_SQL2017;Database=UNED_streaming;Trusted_Connection=True;");           
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contenidos>(entity =>
            {
                entity.ToTable("T_CONTENIDOS");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Caratula)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Fecha).HasColumnType("datetime");

                entity.Property(e => e.FkEstado).HasColumnName("fk_estado");

                entity.Property(e => e.FkProductora).HasColumnName("fk_productora");

                entity.Property(e => e.FkTematica).HasColumnName("fk_tematica");

                entity.Property(e => e.FkTipo).HasColumnName("fk_tipo");

                entity.Property(e => e.Identificador)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Recurso)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Título)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkEstadoNavigation)
                    .WithMany(p => p.Contenidos)
                    .HasForeignKey(d => d.FkEstado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_T_CONTENIDOS_TC_CONTENIDO_ESTADOS");

                entity.HasOne(d => d.FkProductoraNavigation)
                    .WithMany(p => p.Contenidos)
                    .HasForeignKey(d => d.FkProductora)
                    .HasConstraintName("FK_T_CONTENIDOS_T_PRODUCTORAS");

                entity.HasOne(d => d.FkTematicaNavigation)
                    .WithMany(p => p.Contenidos)
                    .HasForeignKey(d => d.FkTematica)
                    .HasConstraintName("FK_T_CONTENIDOS_TC_CONTENIDO_TEMATICA");

                entity.HasOne(d => d.FkTipoNavigation)
                    .WithMany(p => p.Contenidos)
                    .HasForeignKey(d => d.FkTipo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_T_CONTENIDOS_TC_CONTENIDO_TIPOS");
            });

            modelBuilder.Entity<Directores>(entity =>
            {
                entity.ToTable("T_DIRECTORES");

                entity.Property(e => e.Apellido1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Apellido2)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.FechaNacimiento).HasColumnType("datetime"); 

                entity.Property(e => e.Nombre)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasMany(d => d.FkContenidos)
                    .WithMany(p => p.FkDirectors)
                    .UsingEntity<Dictionary<string, object>>(
                        "TrContenidoDirectore",
                        l => l.HasOne<Contenidos>().WithMany().HasForeignKey("FkContenido").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_TR_CONTENIDO_DIRECTOS_T_CONTENIDOS"),
                        r => r.HasOne<Directores>().WithMany().HasForeignKey("FkDirector").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_TR_CONTENIDO_DIRECTOS_T_DIRECTORES"),
                        j =>
                        {
                            j.HasKey("FkDirector", "FkContenido").HasName("PK_TR_CONTENIDO_DIRECTOS");

                            j.ToTable("TR_CONTENIDO_DIRECTORES");

                            j.IndexerProperty<int>("FkDirector").HasColumnName("fk_director");

                            j.IndexerProperty<int>("FkContenido").HasColumnName("fk_contenido");
                        });
            });

            modelBuilder.Entity<Interpretes>(entity =>
            {
                entity.ToTable("T_INTERPRETES");

                entity.Property(e => e.Apellido1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Apellido2)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.FechaNacimiento)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasMany(d => d.FkContenidos)
                    .WithMany(p => p.FkInterpretes)
                    .UsingEntity<Dictionary<string, object>>(
                        "TrContenidoInterprete",
                        l => l.HasOne<Contenidos>().WithMany().HasForeignKey("FkContenido").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_TR_CONTENIDO_INTERPRETES_T_CONTENIDOS"),
                        r => r.HasOne<Interpretes>().WithMany().HasForeignKey("FkInterprete").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_TR_CONTENIDO_INTERPRETES_T_INTERPRETES"),
                        j =>
                        {
                            j.HasKey("FkInterprete", "FkContenido");

                            j.ToTable("TR_CONTENIDO_INTERPRETES");

                            j.IndexerProperty<int>("FkInterprete").HasColumnName("fk_interprete");

                            j.IndexerProperty<int>("FkContenido").HasColumnName("fk_contenido");
                        });
            });

            modelBuilder.Entity<Productoras>(entity =>
            {
                entity.ToTable("T_PRODUCTORAS");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.ToTable("T_USUARIOS");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Apellido1)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("apellido1");

                entity.Property(e => e.Apellido2) 
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("apellido2");

                entity.Property(e => e.Clave)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("clave");

                entity.Property(e => e.CodigoPostal)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("codigoPostal");

                entity.Property(e => e.CorreoElectronico)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("correoElectronico");

                entity.Property(e => e.CuentaBancaria)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("cuentaBancaria");

                entity.Property(e => e.Direccion)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("direccion");

                entity.Property(e => e.FkCcaa).HasColumnName("fk_ccaa");

                entity.Property(e => e.FkEstado).HasColumnName("fk_estado");

                entity.Property(e => e.FkMunicipio).HasColumnName("fk_municipio");

                entity.Property(e => e.FkProvincia).HasColumnName("fk_provincia");

                entity.Property(e => e.FkRol).HasColumnName("fk_rol");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.FkCcaaNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.FkCcaa)
                    .HasConstraintName("FK_T_USUARIOS_TC_CCAAS");
                 

                entity.HasOne(d => d.FkEstadoNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.FkEstado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_T_USUARIOS_TC_USUARIO_ESTADOS");

                entity.HasOne(d => d.FkMunicipioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.FkMunicipio)
                    .HasConstraintName("FK_T_USUARIOS_TC_MUNICIPIOS");

                entity.HasOne(d => d.FkProvinciaNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.FkProvincia)
                    .HasConstraintName("FK_T_USUARIOS_TC_PROVINCIAS");

                entity.HasOne(d => d.FkRolNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.FkRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_T_USUARIOS_TC_ROLES");
            });

            modelBuilder.Entity<Valoraciones>(entity =>
            {
                entity.HasKey(e => new { e.FkSocio, e.FkContenido });

                entity.ToTable("T_VALORACIONES");

                entity.Property(e => e.FkSocio).HasColumnName("fk_socio");

                entity.Property(e => e.FkContenido).HasColumnName("fk_contenido");

                entity.Property(e => e.Fecha)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha");

                entity.Property(e => e.Valoracion).HasColumnName("valoracion");

                entity.HasOne(d => d.FkContenidoNavigation)
                    .WithMany(p => p.Valoraciones)
                    .HasForeignKey(d => d.FkContenido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_T_VALORACIONES_T_CONTENIDOS");

                entity.HasOne(d => d.FkSocioNavigation)
                    .WithMany(p => p.Valoraciones)
                    .HasForeignKey(d => d.FkSocio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_T_VALORACIONES_T_USUARIOS");
            });

            modelBuilder.Entity<Visualizaciones>(entity =>
            {
                entity.ToTable("T_VISUALIZACIONES");

                entity.Property(e => e.Fecha)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha");

                entity.Property(e => e.FkContenido).HasColumnName("fk_contenido");

                entity.Property(e => e.FkSocio).HasColumnName("fk_socio"); 

                entity.HasOne(d => d.FkContenidoNavigation)
                    .WithMany(p => p.Visualizaciones)
                    .HasForeignKey(d => d.FkContenido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_T_VISUALIZACIONES_T_CONTENIDOS");

                entity.HasOne(d => d.FkSocioNavigation)
                    .WithMany(p => p.Visualizaciones)
                    .HasForeignKey(d => d.FkSocio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_T_VISUALIZACIONES_T_USUARIOS");
            });

            modelBuilder.Entity<Ccaas>(entity =>
            {
                entity.ToTable("TC_CCAAS");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ContenidoEstados>(entity =>
            {
                entity.ToTable("TC_CONTENIDO_ESTADOS");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ContenidoTematicas>(entity =>
            {
                entity.ToTable("TC_CONTENIDO_TEMATICA");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ContenidoTipos>(entity =>
            {
                entity.ToTable("TC_CONTENIDO_TIPOS");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Municipios>(entity =>
            {
                entity.ToTable("TC_MUNICIPIOS");

                entity.Property(e => e.FkCcaa).HasColumnName("fk_ccaa");

                entity.Property(e => e.FkProvincia).HasColumnName("fk_provincia");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkCcaaNavigation)
                    .WithMany(p => p.Municipios)
                    .HasForeignKey(d => d.FkCcaa)
                    .HasConstraintName("FK_TC_MUNICIPIOS_TC_CCAAS");

                entity.HasOne(d => d.FkProvinciaNavigation)
                    .WithMany(p => p.Municipios)
                    .HasForeignKey(d => d.FkProvincia)
                    .HasConstraintName("FK_TC_MUNICIPIOS_TC_PROVINCIAS");
            });

            modelBuilder.Entity<Provincias>(entity =>
            {
                entity.ToTable("TC_PROVINCIAS");

                entity.Property(e => e.FkCcaa).HasColumnName("fk_ccaa");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkCcaaNavigation)
                    .WithMany(p => p.Provincias)
                    .HasForeignKey(d => d.FkCcaa)
                    .HasConstraintName("FK_TC_PROVINCIAS_TC_CCAAS");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.ToTable("TC_ROLES");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UsuarioEstados>(entity =>
            {
                entity.ToTable("TC_USUARIO_ESTADOS");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
             

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
