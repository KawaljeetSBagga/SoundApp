export type MusicStatus = 'playing' | 'not_playing'

export type MusicType = 'piano' | 'guitar' | 'swag' | null;

export type DownloadStatus = 'downloaded' | 'in_progress' | 'not_started'

export type FileMaster = {
  music: {
    path: string,
    type: MusicType,
    status: MusicStatus
  },
  download: {
    progress: number;
    status: DownloadStatus;
  }
}