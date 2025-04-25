import type { CompressImageType, UploadConfigType } from './types';
import { uploadURL } from '@/const/env';
import { hideLoading, showLoading } from '@/hooks/use-uni';
import { t } from '@/local';

const DefaultDirnameEnum = 'static';

/**
 * Get the upload path for a specific directory
 * @param {string} [dirname] - The directory name for uploads
 * @returns {string} The complete upload path
 */
export const useUploadPath = (dirname = DefaultDirnameEnum) => {
  return `${uploadURL}/${dirname}/upload/`;
};

export const useUploadHeader = () => {
  return {};
};

/**
 * Upload an image file
 * @param {string} fileImage - The path to the image file to upload
 * @param {UploadConfigType} [config] - Optional upload configuration
 * @param {(e: any) => void} [progressUpdate] - Optional callback for upload progress
 * @returns {Promise<string>} A promise that resolves with the upload response
 */
export function useUploadImage(
  fileImage: string,
  config?: UploadConfigType,
  progressUpdate?: (e: any) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    showLoading(t('upload.uploading'));
    const url = useUploadPath(config?.dirname);
    const header = useUploadHeader();
    const updateloadCB = uni.uploadFile({
      url,
      filePath: fileImage,
      name: config?.name || 'file',
      header,
      success: (res) => {
        resolve(res);
      },
      fail: (error) => {
        reject(error);
      },
      complete: () => {
        hideLoading();
      },
    });
    progressUpdate && updateloadCB.onProgressUpdate(progressUpdate);
  });
}
/**
 * @description: 递归压缩图片
 * 临界值 超过options.num 或者 压缩的图片大小大于原图片大小
 * @param {string} path
 * @param {number} size
 * @param {number} num
 * @param {number} quality
 * @param {boolean} network
 * @param {compressImageType} options num :压缩次数 size:图片压缩大小限制(单位kb) quality:压缩质量
 * @return {*}
 */
const compressImage = (path: string, options?: CompressImageType, count?: number): Promise<string> => {
  let curCount = count || 0;
  const total = options?.num || 5;
  let size = 1024 * 1024; // 默认1024kb
  if (options?.size) {
    size = options?.size * 1024;
  }
  return new Promise((resolve) => {
    uni.getFileSystemManager().getFileInfo({
      filePath: path,
      success: (fileInfo) => {
        const fileSize = fileInfo.size;
        if (fileSize > size && curCount < total) {
          uni.compressImage({
            src: path,
            quality: options?.quality || 80,
            compressedWidth: options?.compressedWidth || undefined,
            compressHeight: options?.compressHeight || undefined,
            success(compressRes) {
              curCount++;
              const res = compressRes.tempFilePath;
              compressImage(res, options, curCount).then(resolve);
            },
            fail(err) {
              console.log(t('upload.compressFailed'), err);
              resolve(path);
            },
          });
        } else {
          resolve(path);
        }
      },
      fail() {
        resolve(path);
      },
    });
  });
};
/**
 * @description:
 * @param {string} filePath // 图片路径 如果是网络图片 需要配置network为true
 * @param {compressImageType} options
 * @param {number} size  // 图片压缩大小限制  单位kb
 * @param {number} num  // 压缩次数
 * @param {number} quality   // 图片压缩质量限制
 * @param {boolean} network  //图片是否是网络图片
 * @param {number} compressedWidth //压缩后的图片宽度
 * @param {number} compressHeight //压缩后的图片高度
 * @param {Function} progressUpdate
 * @return {*}
 */
export function compressLocalImageUpLoadFile(
  filePath: string,
  options?: CompressImageType,
  progressUpdate?: (e: any) => void,
): Promise<any> {
  return new Promise(async (resolve) => {
    let path = filePath;
    let netWorkPath = '';
    // 如果是远程图片 需要转换成本地图片后再进行压缩
    if (options?.network) {
      netWorkPath = path = await getLocalImagePath(filePath);
    }
    // 压缩图片
    path = await compressImage(path, options);
    // 远程图片压缩失败/未压缩的情况下直接原url
    if (netWorkPath && path === netWorkPath) {
      resolve({ data: filePath });
      return;
    }
    // 上传图片
    const fileData = await useUploadImage(path, {}, progressUpdate);
    resolve(fileData);
  });
}
/**
 * @description: 将网络图片路径转换为本地文件路径
 * @param {string} remotePath
 * @return {*}
 */
export const getLocalImagePath = (remotePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: remotePath,
      success: (downloadRes) => {
        resolve(downloadRes.path);
      },
      fail: (err) => {
        reject(remotePath);
      },
    });
  });
};
