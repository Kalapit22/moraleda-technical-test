import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiParam } from "@nestjs/swagger";
import { ProjectService } from "../application/services/project.service";
import { CreateProjectDto } from "../application/dto/create-project.dto";
import { UpdateProjectDto } from "../application/dto/update-project.dto";

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Get all projects' })
  @Get()
  async findAll() {
    return this.projectService.findAll();
  }

  @ApiOperation({ summary: 'Get a project by id' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new project' })
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @ApiOperation({ summary: 'Update a project' })
  @ApiParam({ name: 'id', required: true })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectService.deleteById(id);
  }
}
