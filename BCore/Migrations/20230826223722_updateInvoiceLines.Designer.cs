﻿// <auto-generated />
using System;
using BCore.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BCore.Migrations
{
    [DbContext(typeof(BCoreContext))]
    [Migration("20230826223722_updateInvoiceLines")]
    partial class updateInvoiceLines
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BCore.Models.Customer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Iban")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("BCore.Models.Invoice", b =>
                {
                    b.Property<Guid>("DocumentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AccountSystemType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BookingStatus")
                        .HasColumnType("int");

                    b.Property<string>("Currency")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("CustomerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DueDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("FileRelativePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Number")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double?>("TotalAmount")
                        .HasColumnType("float");

                    b.Property<DateTime?>("TransactionDate")
                        .HasColumnType("datetime2");

                    b.HasKey("DocumentId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("Number")
                        .IsUnique()
                        .HasFilter("[Number] IS NOT NULL");

                    b.ToTable("Invoices");
                });

            modelBuilder.Entity("BCore.Models.Invoice", b =>
                {
                    b.HasOne("BCore.Models.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId");

                    b.OwnsMany("BCore.Models.InvoiceLine", "InvoiceLines", b1 =>
                        {
                            b1.Property<Guid>("InvoiceDocumentId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            SqlServerPropertyBuilderExtensions.UseIdentityColumn(b1.Property<int>("Id"));

                            b1.Property<string>("AccountCode")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("CostCenter")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Department")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Description")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Item")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Location")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<double?>("VatAmount")
                                .HasColumnType("float");

                            b1.HasKey("InvoiceDocumentId", "Id");

                            b1.ToTable("InvoiceLine");

                            b1.WithOwner()
                                .HasForeignKey("InvoiceDocumentId");

                            b1.OwnsOne("BCore.Models.Amount", "Amount", b2 =>
                                {
                                    b2.Property<Guid>("InvoiceLineInvoiceDocumentId")
                                        .HasColumnType("uniqueidentifier");

                                    b2.Property<int>("InvoiceLineId")
                                        .HasColumnType("int");

                                    b2.Property<double>("FinalValue")
                                        .HasColumnType("float");

                                    b2.Property<long>("Quantity")
                                        .HasColumnType("bigint");

                                    b2.Property<double>("UnitPrice")
                                        .HasColumnType("float");

                                    b2.HasKey("InvoiceLineInvoiceDocumentId", "InvoiceLineId");

                                    b2.ToTable("InvoiceLine");

                                    b2.WithOwner()
                                        .HasForeignKey("InvoiceLineInvoiceDocumentId", "InvoiceLineId");
                                });

                            b1.OwnsOne("BCore.Models.VAT", "Vat", b2 =>
                                {
                                    b2.Property<Guid>("InvoiceLineInvoiceDocumentId")
                                        .HasColumnType("uniqueidentifier");

                                    b2.Property<int>("InvoiceLineId")
                                        .HasColumnType("int");

                                    b2.Property<string>("Name")
                                        .IsRequired()
                                        .HasColumnType("nvarchar(max)");

                                    b2.Property<double>("Percentage")
                                        .HasColumnType("float");

                                    b2.HasKey("InvoiceLineInvoiceDocumentId", "InvoiceLineId");

                                    b2.ToTable("InvoiceLine");

                                    b2.WithOwner()
                                        .HasForeignKey("InvoiceLineInvoiceDocumentId", "InvoiceLineId");
                                });

                            b1.Navigation("Amount");

                            b1.Navigation("Vat");
                        });

                    b.Navigation("Customer");

                    b.Navigation("InvoiceLines");
                });
#pragma warning restore 612, 618
        }
    }
}
