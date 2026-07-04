using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddForeignKeyConstraintInSubTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER TABLE ""SubTaskItems""
                ADD CONSTRAINT ""FK_SubTaskItems_TaskItems_MainTaskId""
                FOREIGN KEY (""MainTaskId"")
                REFERENCES ""TaskItems""(""Id"")
                ON DELETE CASCADE;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER TABLE ""SubTaskItems""
                DROP CONSTRAINT ""FK_SubTaskItems_TaskItems_MainTaskId"";
            ");
        }
    }
}
