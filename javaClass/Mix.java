import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.*;
import java.io.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class MixRunnable implements Runnable {
    int i;
    int maxx;
    int maxy;
    int maxz;

    @Override
    public void run() {
        try {
            Mix.createFrame(i,maxx,maxy,maxz);
            synchronized (Mix.class) {
                Mix.finnishedNum++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public MixRunnable(int i, int maxx, int maxy, int maxz) {
        this.i = i;
        this.maxx = maxx;
        this.maxy = maxy;
        this.maxz = maxz;
    }
}

public class Mix {
    static int finnishedNum = 0;

    public static void enne() {
        System.out.println("success");
    }


    public static void main(String[] args) throws IOException, InterruptedException {
    }

    public static void transform(String path, int maxx, int maxy, int maxz, int maxframe) throws IOException, InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
        for (int i = 0; i <= maxframe; i++) {
            pool.submit(new MixRunnable(i,maxx, maxy, maxz));
        }
        while (finnishedNum < maxframe+1) {
            Thread.sleep(1000);
        }
        pool.shutdown();
    }

    public static void createImage(int maxx,int maxy,int heightN, int frameN, int[] smoke, int[] fire) throws IOException {
        BufferedImage bi = new BufferedImage(maxx+1, maxy+1, BufferedImage.TYPE_INT_BGR);
        File picture = new File(System.getProperty("user.dir") + "/particle/mix/frame" + frameN + "/image" + heightN + ".png");
//        File picture = new File("E:\\Desktop\\new\\fire2\\frame" + frameN + "\\image" + heightN + ".png");
        try {
            if (picture.exists()) {
                picture.delete();
                picture.createNewFile();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        Graphics2D g = bi.createGraphics();
        bi = g.getDeviceConfiguration().createCompatibleImage(maxx+1, maxy+1, Transparency.TRANSLUCENT);
        g.dispose();
        g = bi.createGraphics();
        int count = heightN * (maxx+1)*(maxy+1);
        for (int i = 0; i <= maxx; i++) {
            for (int j = 0; j <= maxy; j++) {
                if (smoke[count] != 0) {
                    g.setColor(new Color(0, 0, 0, smoke[count]));
                    g.fillRect(i, j, 1, 1);
                }
                if (fire[count] != 0) {
                    g.setColor(new Color(252, 48, 7, fire[count]));
                    g.fillRect(i, j, 1, 1);
                }
                count++;
            }
        }
        g.dispose();
        boolean val = false;
        try {
            val = ImageIO.write(bi, "png", picture);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void createFrame(int frameN, int maxx, int maxy, int maxz) throws IOException {
        File file = new File(System.getProperty("user.dir") + "/particle/mix/frame" + frameN);
        if (!file.exists()) {
            file.mkdir();
        }
        FileReader somke_fr = new FileReader("E:\\Desktop\\room\\room_06_01\\trace\\frame" + frameN + ".dat");
        BufferedReader smoke_bf = new BufferedReader(somke_fr);
        FileReader fire_fr = new FileReader("E:\\Desktop\\room\\room_06_02\\trace\\frame" + frameN + ".dat");
        BufferedReader fire_bf = new BufferedReader(fire_fr);
        int[] smoke = new int[80000];
        int[] fire = new int[80000];
        String line1 = null;
        String line2 = null;
        int p = 0;
        while ((line1 = smoke_bf.readLine()) != null && (line2 = fire_bf.readLine()) != null) {
            smoke[p] = Integer.parseInt(line1);
            fire[p++] = Integer.parseInt(line2);
        }
        for (int k = 0; k <= maxz; k++) {
            createImage(maxx,maxy,k, frameN, smoke, fire);
        }
        System.out.println(frameN + "  finished");
        smoke_bf.close();
    }
}
