BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Mahasiswa] (
    [id] NVARCHAR(1000) NOT NULL,
    [nim] NVARCHAR(1000) NOT NULL,
    [nama] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [jurusanId] NVARCHAR(1000) NOT NULL,
    [semester] INT NOT NULL CONSTRAINT [Mahasiswa_semester_df] DEFAULT 1,
    [statusId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Mahasiswa_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Mahasiswa_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Mahasiswa_nim_key] UNIQUE NONCLUSTERED ([nim]),
    CONSTRAINT [Mahasiswa_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Mahasiswa_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[StatusMhs] (
    [id] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [StatusMhs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [StatusMhs_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StatusMhs_status_key] UNIQUE NONCLUSTERED ([status])
);

-- CreateTable
CREATE TABLE [dbo].[Admin] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Admin_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Admin_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Admin_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[MataKuliah] (
    [id] NVARCHAR(1000) NOT NULL,
    [kode_mk] NVARCHAR(1000) NOT NULL,
    [nama_mk] NVARCHAR(1000) NOT NULL,
    [sks] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MataKuliah_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [MataKuliah_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [MataKuliah_kode_mk_key] UNIQUE NONCLUSTERED ([kode_mk])
);

-- CreateTable
CREATE TABLE [dbo].[Nilai] (
    [id] NVARCHAR(1000) NOT NULL,
    [nilai] NVARCHAR(1000) NOT NULL,
    [bobot] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Nilai_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Nilai_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Nilai_nilai_key] UNIQUE NONCLUSTERED ([nilai])
);

-- CreateTable
CREATE TABLE [dbo].[SemesterJurusan_mk] (
    [id] NVARCHAR(1000) NOT NULL,
    [jurusanId] NVARCHAR(1000) NOT NULL,
    [semesterId] NVARCHAR(1000) NOT NULL,
    [mataKuliahId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [SemesterJurusan_mk_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [SemesterJurusan_mk_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Jurusan] (
    [id] NVARCHAR(1000) NOT NULL,
    [nama_jurusan] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Jurusan_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Jurusan_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Jurusan_nama_jurusan_key] UNIQUE NONCLUSTERED ([nama_jurusan])
);

-- CreateTable
CREATE TABLE [dbo].[Semester] (
    [id] NVARCHAR(1000) NOT NULL,
    [semester] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Semester_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Semester_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Semester_semester_key] UNIQUE NONCLUSTERED ([semester])
);

-- CreateTable
CREATE TABLE [dbo].[Krs] (
    [id] NVARCHAR(1000) NOT NULL,
    [mahasiswaId] NVARCHAR(1000) NOT NULL,
    [mataKuliahId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Krs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Krs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StatusKrs] (
    [id] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [StatusKrs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [StatusKrs_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [StatusKrs_status_key] UNIQUE NONCLUSTERED ([status])
);

-- AddForeignKey
ALTER TABLE [dbo].[Mahasiswa] ADD CONSTRAINT [Mahasiswa_jurusanId_fkey] FOREIGN KEY ([jurusanId]) REFERENCES [dbo].[Jurusan]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Mahasiswa] ADD CONSTRAINT [Mahasiswa_statusId_fkey] FOREIGN KEY ([statusId]) REFERENCES [dbo].[StatusMhs]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Mahasiswa] ADD CONSTRAINT [Mahasiswa_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Admin] ADD CONSTRAINT [Admin_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SemesterJurusan_mk] ADD CONSTRAINT [SemesterJurusan_mk_jurusanId_fkey] FOREIGN KEY ([jurusanId]) REFERENCES [dbo].[Jurusan]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SemesterJurusan_mk] ADD CONSTRAINT [SemesterJurusan_mk_semesterId_fkey] FOREIGN KEY ([semesterId]) REFERENCES [dbo].[Semester]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SemesterJurusan_mk] ADD CONSTRAINT [SemesterJurusan_mk_mataKuliahId_fkey] FOREIGN KEY ([mataKuliahId]) REFERENCES [dbo].[MataKuliah]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Krs] ADD CONSTRAINT [Krs_mahasiswaId_fkey] FOREIGN KEY ([mahasiswaId]) REFERENCES [dbo].[Mahasiswa]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Krs] ADD CONSTRAINT [Krs_mataKuliahId_fkey] FOREIGN KEY ([mataKuliahId]) REFERENCES [dbo].[MataKuliah]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
