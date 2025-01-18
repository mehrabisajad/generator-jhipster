/**
 * Copyright 2013-2024 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { GeneratorDefinition } from '../base-application/generator.js';
import { clientApplicationTemplatesBlock } from '../client/support/files.js';
import CoreGenerator from '../base-core/index.js';
import { WriteFileSection } from '../base/api.js';
import { asWritingEntitiesTask } from '../base-application/support/task-type-inference.js';

const entityModelFiles = clientApplicationTemplatesBlock({
  condition: generator => !generator.readOnly,
  relativePath: '../../',
  templates: ['domain/model/_entityFile_.model.ts', 'domain/model/_entityFile_.test-samples.ts', 'domain/model/_entityFile_.model.spec.ts'],
});
const entityEventFiles = clientApplicationTemplatesBlock({
  condition: generator => !generator.readOnly,
  relativePath: '../../',
  templates: [
    'domain/event/_entityFolder_/_entityFile_-created.event.ts',
    'domain/event/_entityFolder_/_entityFile_-updated.event.ts',
    'domain/event/_entityFolder_/_entityFile_-deleted.event.ts',
    'domain/event/_entityFolder_/index.ts',
  ],
});
const entityApplicationQueryCommon = clientApplicationTemplatesBlock({
  relativePath: '../../',
  templates: [
    'application/query/_entityFolder_/_entityFile_-pageable.query.ts',
    'application/port/_entityFolder_/_entityFile_-persistence-query.port.ts',
  ],
});
const entityApplicationQueryFindAll = clientApplicationTemplatesBlock({
  condition: generator => generator.otherRelationships.filter(o => !o.otherEntity.readOnly).length,
  relativePath: '../../',
  templates: ['application/query/_entityFolder_/_entityFile_-find-all.query.ts'],
});
const entityApplicationQuery = clientApplicationTemplatesBlock({
  condition: generator => !generator.readOnly,
  relativePath: '../../',
  templates: ['application/query/_entityFolder_/_entityFile_-find-by-id.query.ts'],
});
const entityApplicationCommand = clientApplicationTemplatesBlock({
  condition: generator => !generator.readOnly,
  relativePath: '../../',
  templates: [
    'application/command/_entityFolder_/_entityFile_-create-or-update.command.ts',
    'application/command/_entityFolder_/_entityFile_-delete.command.ts',
    'application/port/_entityFolder_/_entityFile_-persistence-command.port.ts',
  ],
});
const entityApplicationCommandChangeStatus = clientApplicationTemplatesBlock({
  condition: generator => !generator.readOnly && generator.fields.some(field => field.fieldName === 'status'),
  relativePath: '../../',
  templates: ['application/command/_entityFolder_/_entityFile_-change-status.command.ts'],
});
const entityApplicationVM = clientApplicationTemplatesBlock({
  condition: generator => generator.readOnly,
  relativePath: '../../',
  templates: ['application/view-model/_entityFile_.vm.ts'],
});

const entityServiceFiles = clientApplicationTemplatesBlock({
  condition: generator => !generator.embedded,
  relativePath: '../../',
  templates: [
    'http-adapter/_entityFolder_/_entityFile_.api.ts',
    'http-adapter/_entityFolder_/_entityFile_.port.ts',
    // 'http-adapter/_entityFolder_/_entityFile_.port.spec.ts',
    'http-adapter/_entityFolder_/_entityFile_.service.ts',
  ],
});

const entityUIFiles = clientApplicationTemplatesBlock({
  relativePath: '../../',
  templates: [
    'ui-adapter/activity/_entityFolder_/_entityFile_.df.ts',
    'ui-adapter/activity/_entityFolder_/_entityFile_.authority.ts',
    'ui-adapter/activity/_entityFolder_/route/_entityFile_.route.ts',
    'ui-adapter/activity/_entityFolder_/list/_entityFile_.component.ts',
    'ui-adapter/activity/_entityFolder_/list/_entityFile_.component.html',
  ],
});
const entityUICommandFiles = clientApplicationTemplatesBlock({
  condition: generator => !generator.readOnly,
  relativePath: '../../',
  templates: [
    'ui-adapter/activity/_entityFolder_/route/_entityFile_-routing.resolve.ts',
    'ui-adapter/activity/_entityFolder_/delete/_entityFile_-delete-dialog.component.html',
    'ui-adapter/activity/_entityFolder_/delete/_entityFile_-delete-dialog.component.ts',
    'ui-adapter/activity/_entityFolder_/form/_entityFile_-form.component.ts',
    'ui-adapter/activity/_entityFolder_/form/_entityFile_-form.component.html',
    'ui-adapter/activity/_entityFolder_/form/_entityFile_-form-dialog.component.ts',
  ],
});

const entityUIChangeStatusFiles = clientApplicationTemplatesBlock({
  condition: generator => !generator.readOnly && generator.fields.some(field => field.fieldName === 'status'),
  relativePath: '../../',
  templates: [
    'ui-adapter/activity/_entityFolder_/change-status/_entityFile_-change-status-dialog.component.html',
    'ui-adapter/activity/_entityFolder_/change-status/_entityFile_-change-status-dialog.component.ts',
  ],
});
const entityProvider = clientApplicationTemplatesBlock({
  relativePath: '../../',
  templates: [
    'provider/access/_entityFile_.access.ts',
    'provider/register-handler/_entityFile_.handler.ts',
  ],
});

export const builtInFiles: WriteFileSection = {
  model: [entityModelFiles],
  service: [entityServiceFiles],
};

export const angularFiles = {
  model: [entityModelFiles],
  event: [entityEventFiles],
  application: [
    entityApplicationQueryCommon,
    entityApplicationQueryFindAll,
    entityApplicationQuery,
    entityApplicationVM,
    entityApplicationCommand,
    entityApplicationCommandChangeStatus,
  ],
  httpAdapter: [entityServiceFiles],
  uiAdapter: [entityUIFiles, entityUICommandFiles, entityUIChangeStatusFiles],
  provider: [entityProvider],
  /*client: [
    clientApplicationTemplatesBlock({
      condition: generator => !generator.embedded,
      templates: [
        'entities/_entityFolder_/_entityFile_.routes.ts',
        'entities/_entityFolder_/detail/_entityFile_-detail.component.html',
        'entities/_entityFolder_/detail/_entityFile_-detail.component.ts',
        'entities/_entityFolder_/detail/_entityFile_-detail.component.spec.ts',
        'entities/_entityFolder_/list/_entityFile_.component.html',
        'entities/_entityFolder_/list/_entityFile_.component.ts',
        'entities/_entityFolder_/list/_entityFile_.component.spec.ts',
        'entities/_entityFolder_/route/_entityFile_-routing-resolve.service.ts',
        'entities/_entityFolder_/route/_entityFile_-routing-resolve.service.spec.ts',
      ],
    }),
    clientApplicationTemplatesBlock({
      condition: generator => !generator.readOnly && !generator.embedded,
      templates: [
        'entities/_entityFolder_/update/_entityFile_-form.service.ts',
        'entities/_entityFolder_/update/_entityFile_-form.service.spec.ts',
        'entities/_entityFolder_/update/_entityFile_-update.component.html',
        'entities/_entityFolder_/update/_entityFile_-update.component.spec.ts',
        'entities/_entityFolder_/delete/_entityFile_-delete-dialog.component.html',
        'entities/_entityFolder_/update/_entityFile_-update.component.ts',
        'entities/_entityFolder_/delete/_entityFile_-delete-dialog.component.ts',
        'entities/_entityFolder_/delete/_entityFile_-delete-dialog.component.spec.ts',
      ],
    }),
  ],*/
};

// export const userManagementFiles: WriteFileSection = {
//   userManagement: [
//     clientApplicationTemplatesBlock({
//       templates: [
//         'admin/user-management/user-management.route.ts',
//         'admin/user-management/user-management.model.ts',
//         'admin/user-management/list/user-management.component.html',
//         'admin/user-management/list/user-management.component.spec.ts',
//         'admin/user-management/list/user-management.component.ts',
//         'admin/user-management/detail/user-management-detail.component.html',
//         'admin/user-management/detail/user-management-detail.component.spec.ts',
//         'admin/user-management/detail/user-management-detail.component.ts',
//         'admin/user-management/update/user-management-update.component.html',
//         'admin/user-management/update/user-management-update.component.spec.ts',
//         'admin/user-management/update/user-management-update.component.ts',
//         'admin/user-management/delete/user-management-delete-dialog.component.html',
//         'admin/user-management/delete/user-management-delete-dialog.component.spec.ts',
//         'admin/user-management/delete/user-management-delete-dialog.component.ts',
//         'admin/user-management/service/user-management.service.spec.ts',
//         'admin/user-management/service/user-management.service.ts',
//       ],
//     }),
//   ],
// };

export const writeEntitiesFiles = asWritingEntitiesTask(async function (
  this: CoreGenerator,
  { control, application, entities }: GeneratorDefinition['writingEntitiesTaskParam'],
) {
  for (const entity of (control.filterEntitiesAndPropertiesForClient ?? (entities => entities))(entities)) {
    if (entity.builtInUser) {
      // await this.writeFiles({
      //   sections: builtInFiles,
      //   context: {
      //     ...application,
      //     ...entity,
      //     fields: entity.fields.filter(field => ['id', 'login'].includes(field.fieldName)),
      //     readOnly: true,
      //   },
      // });

      // if (application.generateUserManagement && application.userManagement.skipClient) {
      //   await this.writeFiles({
      //     sections: userManagementFiles,
      //     context: {
      //       ...application,
      //       ...entity,
      //       i18nKeyPrefix: 'userManagement',
      //       entityFileName: 'user-management',
      //       entityFolderPrefix: 'admin',
      //     },
      //   });
      // }
    } else {
      await this.writeFiles({
        sections: entity.entityClientModelOnly ? { model: [entityModelFiles] } : angularFiles,
        context: { ...application, ...entity },
      });
    }
  }
});

export async function postWriteEntitiesFiles(this: CoreGenerator, taskParam: GeneratorDefinition['postWritingEntitiesTaskParam']) {
  const { control, source, application } = taskParam;
  const entities = (control.filterEntitiesForClient ?? (entities => entities))(taskParam.entities).filter(
    entity => !entity.builtInUser && !entity.embedded && !entity.entityClientModelOnly,
  );
  source.addEntitiesToClient({ application, entities });
}

export function cleanupEntitiesFiles(
  this: CoreGenerator,
  { control, application, entities }: GeneratorDefinition['writingEntitiesTaskParam'],
) {
  for (const entity of (control.filterEntitiesForClient ?? (entities => entities))(entities).filter(entity => !entity.builtIn)) {
    const { entityFolderName, entityFileName, name: entityName } = entity;
    if (this.isJhipsterVersionLessThan('5.0.0')) {
      this.removeFile(`${application.clientSrcDir}app/entities/${entityName}/${entityName}.model.ts`);
    }

    if (this.isJhipsterVersionLessThan('6.3.0')) {
      this.removeFile(`${application.clientSrcDir}app/entities/${entityFolderName}/index.ts`);
    }

    if (this.isJhipsterVersionLessThan('7.0.0-beta.0')) {
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}.route.ts`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}.component.ts`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}.component.html`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}-detail.component.ts`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}-detail.component.html`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}-delete-dialog.component.ts`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}-delete-dialog.component.html`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}-update.component.ts`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}-update.component.html`);
      this.removeFile(`${application.clientSrcDir}/app/shared/model/${entity.entityModelFileName}.model.ts`);
      entity.fields.forEach(field => {
        if (field.fieldIsEnum === true) {
          const { enumFileName } = field;
          this.removeFile(`${application.clientSrcDir}/app/shared/model/enumerations/${enumFileName}.model.ts`);
        }
      });
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}-routing-resolve.service.ts`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}-routing.module.ts`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}.service.ts`);
      this.removeFile(`${application.clientSrcDir}/app/entities/${entityFolderName}/${entityFileName}.service.spec.ts`);
      this.removeFile(`${application.clientTestDir}/spec/app/entities/${entityFolderName}/${entityFileName}.component.spec.ts`);
      this.removeFile(`${application.clientTestDir}/spec/app/entities/${entityFolderName}/${entityFileName}-detail.component.spec.ts`);
      this.removeFile(
        `${application.clientTestDir}/spec/app/entities/${entityFolderName}/${entityFileName}-delete-dialog.component.spec.ts`,
      );
      this.removeFile(`${application.clientTestDir}/spec/app/entities/${entityFolderName}/${entityFileName}-update.component.spec.ts`);
      this.removeFile(`${application.clientTestDir}/spec/app/entities/${entityFolderName}/${entityFileName}.service.spec.ts`);
    }

    if (this.isJhipsterVersionLessThan('7.10.0')) {
      this.removeFile(`${application.clientSrcDir}app/entities/${entityFolderName}/${entityFileName}.module.ts`);
      this.removeFile(`${application.clientSrcDir}app/entities/${entityFolderName}/route/${entityFileName}-routing.module.ts`);
    }
  }
}
