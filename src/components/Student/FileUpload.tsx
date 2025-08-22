import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { mockUploadFile } from '@/data/mockData';

interface FileUploadProps {
  onUploadComplete?: (submissionId: string) => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF, JPG, or PNG file.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB.',
        variant: 'destructive',
      });
      return;
    }

    setFile(selectedFile);
    setUploadComplete(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const result = await mockUploadFile(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success) {
        setUploadComplete(true);
        toast({
          title: 'Upload successful',
          description: 'Your file has been uploaded and is being processed.',
        });
        
        if (result.submissionId && onUploadComplete) {
          onUploadComplete(result.submissionId);
        }
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      clearInterval(progressInterval);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploading(false);
    setUploadProgress(0);
    setUploadComplete(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Assignment</CardTitle>
        <CardDescription>
          Upload your assignment file (PDF, JPG, PNG) for AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <motion.div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              Drag and drop your file here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Choose File
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: PDF, JPG, PNG (max 10MB)
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {!uploading && !uploadComplete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetUpload}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {uploadComplete && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {uploadComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-green-600"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Upload completed successfully!</span>
              </motion.div>
            )}

            {!uploading && !uploadComplete && (
              <div className="flex space-x-2">
                <Button onClick={handleUpload} className="flex-1">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
                <Button variant="outline" onClick={resetUpload}>
                  Cancel
                </Button>
              </div>
            )}

            {uploadComplete && (
              <Button onClick={resetUpload} variant="outline" className="w-full">
                Upload Another File
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}