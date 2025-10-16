/**
 * Copyright 2013-2025 the original author or authors from the JHipster project.
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
import { asWriteEntityFilesSection } from '../../../base-application/support/task-type-inference.ts';
import { javaMainPackageTemplatesBlock, javaTestPackageTemplatesBlock } from '../../support/index.ts';

let persistClass = javaMainPackageTemplatesBlock({
  condition: ctx => ctx.entityDomainLayer,
  templates: [
    '_entityPackage_/domain/model/_persistClass_.java.jhi',
    '_entityPackage_/domain/mapper/Domain_persistClass_Mapper.java.jhi',
    '_entityPackage_/domain/event/_persistClass_CreatedEvent.java.jhi',
    '_entityPackage_/domain/event/_persistClass_DeletedEvent.java.jhi',
    '_entityPackage_/domain/event/_persistClass_UpdatedEvent.java.jhi',
  ],
});

const persistClassRenameTo = persistClass.renameTo;

persistClass = {
  ...persistClass,
  renameTo(...param: any[]): string {
    // @ts-ignore
    const originalResult = persistClassRenameTo(...param);
    return `domain/${originalResult}`;
  },
};

export const entityServerFiles = asWriteEntityFilesSection({
  model: [persistClass],
  // modelTestFiles: [
  //   javaTestPackageTemplatesBlock({
  //     condition: ctx => ctx.entityDomainLayer,
  //     templates: [
  //       '_entityPackage_/domain/model/_persistClass_Asserts.java',
  //       '_entityPackage_/domain/model/_persistClass_Test.java',
  //       '_entityPackage_/domain/model/_persistClass_TestSamples.java',
  //     ],
  //   }),
  // ],
  server: [
    javaMainPackageTemplatesBlock({
      condition: ctx => ctx.useJakartaValidation && ctx.entityDomainLayer,
      templates: ['_entityPackage_/domain/model/_persistClass_.java.jhi.jakarta_validation'],
    }),
    javaMainPackageTemplatesBlock({
      condition: ctx => ctx.useJacksonIdentityInfo && ctx.entityDomainLayer,
      templates: ['_entityPackage_/domain/model/_persistClass_.java.jhi.jackson_identity_info'],
    }),
  ],
});

let block = javaMainPackageTemplatesBlock({
  renameTo: (data, filepath) => `${filepath.replace('_enumName_', (data as any).enumName)}`,
  templates: ['_entityPackage_/domain/enumeration/_enumName_.java'],
});

const originalRenameTo = block.renameTo;

block = {
  ...block,
  renameTo(...param: any[]): string {
    // @ts-ignore
    const originalResult = originalRenameTo?.(...param);
    return `domain/${originalResult}`;
  },
};

export const enumFiles = asWriteEntityFilesSection({
  enumFiles: [block],
});
