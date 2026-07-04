using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RemoveOrphanSubTasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DELETE FROM ""SubTaskItems""
                WHERE ""MainTaskId"" NOT IN (
                    SELECT ""Id"" FROM ""TaskItems""
                );
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
