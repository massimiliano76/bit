import { ConcreteService } from '@teambit/environments/services/concrete-service';
import { BuildResults, BuildContext } from '@teambit/builder';

export type TranspileOpts = {
  componentDir: string; // absolute path of the component's root directory
  filePath: string; // relative path of the file inside the component directory
};

export type TranspileOutput =
  | {
      outputText: string;
      outputPath: string;
    }[]
  | null;

export interface Compiler extends ConcreteService {
  /**
   * transpile a single file. this being used during development and get saved into the workspace
   */
  transpileFile: (fileContent: string, options: TranspileOpts) => TranspileOutput;

  /**
   * compile components inside isolated capsules. this being used during tag for the release.
   * meaning, the final package of the component has the dists generated by this method.
   */
  build(context: BuildContext): Promise<BuildResults>;

  /**
   * returns the relative path of the dist directory inside the capsule. e.g. "dist".
   */
  getDistDir(): string;

  /**
   * given a source file, return its parallel in the dists. e.g. "index.ts" => "dist/index.js"
   * both, the return path and the given path are relative paths.
   */
  getDistPathBySrcPath(srcPath: string): string;

  /**
   * only supported files matching get compiled. others, are copied to the dist dir.
   */
  isFileSupported(filePath: string): boolean;
}
