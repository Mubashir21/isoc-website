"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download, Printer, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDate, fetchPrayerTimes, fetchIqamaTimes } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthlyPrayerTimesProps {
  currentDate?: Date;
}

export function MonthlyPrayerTimes({
  currentDate = new Date(),
}: MonthlyPrayerTimesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Generate all days in the current month
  const generateMonthlyData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthlyData = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = getDate(date);
      const prayerTimes = fetchPrayerTimes(dateStr);
      const iqamaTimes = fetchIqamaTimes(
        prayerTimes.prayerTimes,
        prayerTimes.info.hijri,
      );

      monthlyData.push({
        date,
        dateStr,
        day: day.toString().padStart(2, "0"),
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        prayerTimes: prayerTimes.prayerTimes,
        iqamaTimes,
        hijri: prayerTimes.info.hijri,
      });
    }

    return monthlyData;
  };

  const monthlyData = generateMonthlyData();
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const exportToPDF = async () => {
    setIsExporting(true);

    try {
      // Check if we're on a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // On mobile, use print() which is more reliable
        window.print();
        return;
      }

      // Using html2pdf library for desktop
      const html2pdf = (await import("html2pdf.js" as any)).default;

      const element = document.getElementById("monthly-prayer-times-table");
      
      if (!element) {
        throw new Error("Prayer times table not found");
      }

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5], // [top, right, bottom, left] margins in inches
        filename: `prayer-times-${monthName.replace(" ", "-").toLowerCase()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          letterRendering: true,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error exporting PDF:", error);
      // Fallback: always use print on error
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarDays className="h-4 w-4" />
          Monthly View
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-none h-[90vh] max-h-[90vh] overflow-hidden p-0 sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw]">
        <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 p-4 border-b">
          <div>
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl">
              Prayer Times - {monthName}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Complete prayer schedule for UNM Islamic Center
            </DialogDescription>
          </div>

          <Button
            onClick={exportToPDF}
            disabled={isExporting}
            className="gap-2 w-full sm:w-auto mr-6"
            size="sm"
          >
            {isExporting ? (
              <>
                <Printer className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Exporting...</span>
                <span className="sm:hidden">Loading...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export PDF</span>
                <span className="sm:hidden">Download</span>
              </>
            )}
          </Button>
        </DialogHeader>

        <div className="overflow-auto h-[calc(90vh-120px)] p-2 sm:p-4">
          {/* Mobile View - Cards */}
          <div className="block lg:hidden space-y-3">
            {/* Mobile Legend */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Legend</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-200 rounded border border-yellow-300"></div>
                  <span className="font-medium">Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded border border-gray-300"></div>
                  <span className="font-medium">Weekend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-50 rounded border border-blue-200"></div>
                  <span className="font-medium">Weekday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-50 rounded border border-blue-200"></div>
                  <span className="font-medium">Adhan / Iqamah</span>
                </div>
              </div>
            </div>

            {monthlyData.map((dayData, index) => {
              const isToday =
                dayData.date.toDateString() === new Date().toDateString();
              const isWeekend =
                dayData.date.getDay() === 0 || dayData.date.getDay() === 6;

              return (
                <Card
                  key={index}
                  className={cn(
                    "border-2",
                    isToday && "border-yellow-300 bg-yellow-50",
                    isWeekend && !isToday && "border-gray-200 bg-gray-50",
                    !isToday && !isWeekend && "border-gray-200",
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <div>
                          <CardTitle className="text-sm font-semibold">
                            {dayData.day} {dayData.dayName}
                          </CardTitle>
                          <p className="text-xs text-gray-500">
                            {dayData.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {isToday && (
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="space-y-2">
                        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-xs font-medium text-blue-800 mb-1">
                            Fajr
                          </div>
                          <div className="text-base font-bold text-blue-900">
                            {dayData.prayerTimes.Fajr}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Iqamah: {dayData.iqamaTimes.Fajr}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-xs font-medium text-green-800 mb-1">
                            Dhuhr
                          </div>
                          <div className="text-base font-bold text-green-900">
                            {dayData.prayerTimes.Dhuhr}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Iqamah: {dayData.iqamaTimes.Dhuhr}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="text-xs font-medium text-orange-800 mb-1">
                            Asr
                          </div>
                          <div className="text-base font-bold text-orange-900">
                            {dayData.prayerTimes.Asr}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Iqamah: {dayData.iqamaTimes.Asr}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-xs font-medium text-purple-800 mb-1">
                            Maghrib
                          </div>
                          <div className="text-base font-bold text-purple-900">
                            {dayData.prayerTimes.Maghrib}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Iqamah: {dayData.iqamaTimes.Maghrib}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="text-xs font-medium text-indigo-800 mb-1">
                            Isha
                          </div>
                          <div className="text-base font-bold text-indigo-900">
                            {dayData.prayerTimes.Isha}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Iqamah: {dayData.iqamaTimes.Isha}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block">
            <div id="monthly-prayer-times-table" className="bg-white">
              {/* PDF Header */}
              <div
                className="text-center mb-6 print:block"
                style={{ pageBreakAfter: "avoid" }}
              >
                <h1 className="text-2xl font-bold text-blue-600 mb-2 print:text-black">
                  UNM Islamic Center
                </h1>
                <h2 className="text-lg font-semibold text-gray-700 mb-1 print:text-black">
                  Prayer Times - {monthName}
                </h2>
                <p className="text-sm text-gray-500 print:text-black">
                  University of Nottingham Malaysia Campus
                </p>
              </div>

              {/* Prayer Times Table */}
              <div className="overflow-x-auto print:overflow-visible">
                <table
                  className="w-full border-collapse border border-gray-300 print:border-black"
                  style={{ pageBreakInside: "auto" }}
                >
                  <thead>
                    <tr
                      className="bg-blue-600 text-white print:bg-gray-200 print:text-black"
                      style={{
                        pageBreakInside: "avoid",
                        pageBreakAfter: "auto",
                      }}
                    >
                      <th className="border border-gray-300 px-3 py-2 text-left print:border-black">
                        Date
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left print:border-black">
                        Day
                      </th>
                      <th className="border border-gray-300 px-2 py-2 print:border-black">
                        Fajr
                      </th>
                      <th className="border border-gray-300 px-2 py-2 print:border-black">
                        Dhuhr
                      </th>
                      <th className="border border-gray-300 px-2 py-2 print:border-black">
                        Asr
                      </th>
                      <th className="border border-gray-300 px-2 py-2 print:border-black">
                        Maghrib
                      </th>
                      <th className="border border-gray-300 px-2 py-2 print:border-black">
                        Isha
                      </th>
                    </tr>
                    <tr
                      className="bg-blue-100 text-blue-800 text-xs print:bg-gray-100 print:text-black"
                      style={{
                        pageBreakInside: "avoid",
                        pageBreakAfter: "auto",
                      }}
                    >
                      <th className="border border-gray-300 px-3 py-1 print:border-black"></th>
                      <th className="border border-gray-300 px-3 py-1 print:border-black"></th>
                      <th className="border border-gray-300 px-2 py-1 print:border-black">
                        A / I
                      </th>
                      <th className="border border-gray-300 px-2 py-1 print:border-black">
                        A / I
                      </th>
                      <th className="border border-gray-300 px-2 py-1 print:border-black">
                        A / I
                      </th>
                      <th className="border border-gray-300 px-2 py-1 print:border-black">
                        A / I
                      </th>
                      <th className="border border-gray-300 px-2 py-1 print:border-black">
                        A / I
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((dayData, index) => {
                      const isToday =
                        dayData.date.toDateString() ===
                        new Date().toDateString();
                      const isWeekend =
                        dayData.date.getDay() === 0 ||
                        dayData.date.getDay() === 6;

                      return (
                        <tr
                          key={index}
                          className={cn(
                            "text-sm",
                            isToday &&
                              "bg-yellow-50 border-yellow-300 print:bg-yellow-100 print:border-yellow-400",
                            isWeekend &&
                              !isToday &&
                              "bg-gray-50 print:bg-gray-100",
                            index % 2 === 0 &&
                              !isToday &&
                              !isWeekend &&
                              "bg-white",
                            index % 2 === 1 &&
                              !isToday &&
                              !isWeekend &&
                              "bg-blue-25 print:bg-blue-50",
                          )}
                          style={{
                            pageBreakInside: "avoid",
                            pageBreakAfter: "auto",
                          }}
                        >
                          <td className="border border-gray-300 px-3 py-2 font-medium print:border-black">
                            {dayData.day}
                            {isToday && (
                              <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-1 rounded print:bg-yellow-300 print:text-black">
                                Today
                              </span>
                            )}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-gray-600 print:border-black print:text-black">
                            {dayData.dayName}
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-center print:border-black">
                            <div className="text-xs">
                              <div className="print:text-black">
                                {dayData.prayerTimes.Fajr}
                              </div>
                              <div className="text-gray-500 print:text-black">
                                {dayData.iqamaTimes.Fajr}
                              </div>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-center print:border-black">
                            <div className="text-xs">
                              <div className="print:text-black">
                                {dayData.prayerTimes.Dhuhr}
                              </div>
                              <div className="text-gray-500 print:text-black">
                                {dayData.iqamaTimes.Dhuhr}
                              </div>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-center print:border-black">
                            <div className="text-xs">
                              <div className="print:text-black">
                                {dayData.prayerTimes.Asr}
                              </div>
                              <div className="text-gray-500 print:text-black">
                                {dayData.iqamaTimes.Asr}
                              </div>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-center print:border-black">
                            <div className="text-xs">
                              <div className="print:text-black">
                                {dayData.prayerTimes.Maghrib}
                              </div>
                              <div className="text-gray-500 print:text-black">
                                {dayData.iqamaTimes.Maghrib}
                              </div>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-center print:border-black">
                            <div className="text-xs">
                              <div className="print:text-black">
                                {dayData.prayerTimes.Isha}
                              </div>
                              <div className="text-gray-500 print:text-black">
                                {dayData.iqamaTimes.Isha}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer for PDF */}
              <div
                className="mt-6 text-center text-sm text-gray-500 print:block print:text-black"
                style={{ pageBreakBefore: "avoid" }}
              >
                <p>A = Adhan Time | I = Iqamah Time</p>
                <p className="mt-2">
                  Generated on {new Date().toLocaleDateString()} | UNM Islamic
                  Center
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
