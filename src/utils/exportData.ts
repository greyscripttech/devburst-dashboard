
import { toast } from "@/hooks/use-toast";

export interface ExportableData {
  headers: string[];
  rows: any[][];
}

export const exportToCSV = (data: ExportableData, filename: string): boolean => {
  if (!data.rows.length) {
    toast({
      title: "No data to export",
      description: "There is no data available to export.",
      variant: "destructive"
    });
    return false;
  }

  try {
    // Create CSV content
    const csvContent = [
      data.headers.join(','),
      ...data.rows.map(row => 
        row.map(cell => {
          // Handle strings that might contain commas by wrapping them in quotes
          if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        }).join(',')
      )
    ].join('\n');

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: `${filename} has been downloaded.`
    });
    
    // Return true to indicate success (can be used for triggering confetti)
    return true;
  } catch (error) {
    console.error("Export failed:", error);
    toast({
      title: "Export failed",
      description: "There was an error exporting your data.",
      variant: "destructive"
    });
    return false;
  }
};

export const exportToPDF = (elementId: string, filename: string): boolean => {
  toast({
    title: "PDF export",
    description: "PDF export functionality is coming soon."
  });
  return false;
};
