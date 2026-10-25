import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sharp from "sharp";

interface DownloadItem {
  slug: string;
  files: {
    name: string;
    aspect: "4:3" | "3:2";
    url: string;
    width: number;
    height: number;
  }[];
}

const items: DownloadItem[] = [
  {
    slug: "concrete-mixture-machine",
    files: [
      {
        name: "concrete-mixture-machine-main.webp",
        aspect: "4:3",
        url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Concrete_Mixture_at_a_construction_site.jpg",
        width: 1600,
        height: 1200,
      },
      {
        name: "concrete-mixture-machine-detail.webp",
        aspect: "3:2",
        url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Concrete_Mixture_at_a_construction_site.jpg",
        width: 1600,
        height: 1067,
      },
    ],
  },
  {
    slug: "vibrator-machine",
    files: [
      {
        name: "vibrator-machine-main.webp",
        aspect: "4:3",
        url: "https://upload.wikimedia.org/wikipedia/commons/0/03/P14Eactie1.JPG",
        width: 1600,
        height: 1200,
      },
      {
        name: "vibrator-machine-detail.webp",
        aspect: "3:2",
        url: "https://upload.wikimedia.org/wikipedia/commons/7/72/US_Navy_070912-F-8678B-080_Builder_Constructionman_Lauren_M._Nikaido%2C_attached_to_Naval_Mobile_Construction_Battalion_%28NMCB%29_4%2C_uses_a_concrete_vibrator_to_ensure_concrete_is_even_and_free_of_air_bubbles_during_an_overhead_conc.jpg",
        width: 1600,
        height: 1067,
      },
    ],
  },
  {
    slug: "rod-cutter-and-rod-bender-machine",
    files: [
      {
        name: "rod-cutter-and-rod-bender-machine-main.webp",
        aspect: "4:3",
        url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Rebar_worker.jpg",
        width: 1600,
        height: 1200,
      },
      {
        name: "rod-cutter-and-rod-bender-machine-detail.webp",
        aspect: "3:2",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/af/Rebar_on_a_pallet.jpg",
        width: 1600,
        height: 1067,
      },
    ],
  },
  {
    slug: "roller-and-dump-trucks",
    files: [
      {
        name: "roller-and-dump-trucks-main.webp", // First photo: road roller
        aspect: "4:3",
        url: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ride-on_roller_compactor%2C_an_equipment_for_asphalt_pavement%2C_Canada.jpg",
        width: 1600,
        height: 1200,
      },
      {
        name: "roller-and-dump-trucks-truck.webp", // Second photo: dump truck
        aspect: "3:2",
        url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Dump_truck_in_St._Louis%2C_Missouri.JPEG",
        width: 1600,
        height: 1067,
      },
    ],
  },
  {
    slug: "helmets-and-safety-belts",
    files: [
      {
        name: "helmets-and-safety-belts-main.webp",
        aspect: "4:3",
        url: "https://upload.wikimedia.org/wikipedia/commons/3/31/Hard_hat_20111111.jpg",
        width: 1600,
        height: 1200,
      },
      {
        name: "helmets-and-safety-belts-detail.webp",
        aspect: "3:2",
        url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Residential_fall_protection_%289256420116%29.jpg",
        width: 1600,
        height: 1067,
      },
    ],
  },
  {
    slug: "importer-of-cutting-disks",
    files: [
      {
        name: "importer-of-cutting-disks-main.webp",
        aspect: "4:3",
        url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flexscheiben.JPG",
        width: 1600,
        height: 1200,
      },
      {
        name: "importer-of-cutting-disks-detail.webp",
        aspect: "3:2",
        url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Trennscheibe_Vorn.png",
        width: 1600,
        height: 1067,
      },
    ],
  },
  {
    slug: "cutting-blades",
    files: [
      {
        name: "cutting-blades-main.webp",
        aspect: "4:3",
        url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Grinder_diamond_blade.jpg",
        width: 1600,
        height: 1200,
      },
      {
        name: "cutting-blades-detail.webp",
        aspect: "3:2",
        url: "https://upload.wikimedia.org/wikipedia/commons/0/01/Diamond_blade_macro.jpg",
        width: 1600,
        height: 1067,
      },
    ],
  },
  {
    slug: "hardware-tools-from-china",
    files: [
      {
        name: "hardware-tools-from-china-main.webp",
        aspect: "4:3",
        url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Husky_tool_set.jpg",
        width: 1600,
        height: 1200,
      },
      {
        name: "hardware-tools-from-china-detail.webp",
        aspect: "3:2",
        url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Multi_fit_spanner_kit_bits_hex_posidrive_star_three_sided.jpg",
        width: 1600,
        height: 1067,
      },
    ],
  },
];

async function main() {
  console.log("=== DOWNLOADING AND PROCESSING NEW EQUIPMENT IMAGES ===");
  const baseOutputDir = path.join(process.cwd(), "public", "images", "equipment");
  const tmpDir = path.join(process.cwd(), "scripts", "tmp_downloads");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  for (const item of items) {
    const slugDir = path.join(baseOutputDir, item.slug);
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir, { recursive: true });
    }

    for (const f of item.files) {
      const outputPath = path.join(slugDir, f.name);
      if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 5000) {
        console.log(`[SKIP] Already exists and valid: ${outputPath}`);
        continue;
      }

      console.log(`\nFetching ${f.name} for ${item.slug}...`);
      const rawTmpFile = path.join(tmpDir, `tmp_${item.slug}_${f.name}.raw`);

      try {
        const cmd = `curl -sL --fail --retry 3 -A "MsmTradeCenter/1.0 (contact@msmirsulaimantradecenter.com)" "${f.url}" -o "${rawTmpFile}"`;
        execSync(cmd, { stdio: "inherit" });

        const rawBuffer = fs.readFileSync(rawTmpFile);
        console.log(`Downloaded ${rawBuffer.length} bytes. Processing with sharp (${f.width}x${f.height}, ${f.aspect})...`);

        await sharp(rawBuffer, { failOn: "none" })
          .resize(f.width, f.height, {
            fit: "cover",
            position: "center",
          })
          .webp({ quality: 86 })
          .toFile(outputPath);

        console.log(`Saved: ${outputPath}`);
      } catch (err: unknown) {
        console.error(`Failed to process ${f.name}:`, (err as Error).message);
        throw err;
      } finally {
        if (fs.existsSync(rawTmpFile)) {
          fs.unlinkSync(rawTmpFile);
        }
      }
    }
  }

  console.log("\nALL NEW EQUIPMENT IMAGES SUCCESSFULLY DOWNLOADED AND PROCESSED!");
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
