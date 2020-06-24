import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.*;
import java.io.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

class SingleRunnable implements Runnable {
    int i;
    int maxx;
    int maxy;
    int maxz;
    String path;

    @Override
    public void run() {
        try {
            Single.createFrame(i, maxx, maxy, maxz, path);
            synchronized (Single.class) {
                Single.finnishedNum++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public SingleRunnable(int i, int maxx, int maxy, int maxz, String path) {
        this.i = i;
        this.maxx = maxx;
        this.maxy = maxy;
        this.maxz = maxz;
        this.path = path;
    }
}

public class Single {
    static int finnishedNum = 0;

    public static void enne() {
        System.out.println("success");
    }

    static ThreadPoolExecutor threadPoolExecutor = null;

    public static void main(String[] args) throws IOException, InterruptedException {
    }

    public static void transform(int framenumber, int maxx, int maxy, int maxz, String path) throws IOException, InterruptedException {
        if (threadPoolExecutor == null){
            threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
            threadPoolExecutor.setKeepAliveTime(5, TimeUnit.SECONDS);
        }
        threadPoolExecutor.submit(new SingleRunnable(framenumber, maxx, maxy, maxz, path));
    }

    public static void createFrame(int frameN, int maxx, int maxy, int maxz, String filepath) throws IOException {
        File file = new File(System.getProperty("user.dir") + "/public/particle/" + filepath + "frame" + frameN);
        if (!file.exists()) {
            file.mkdirs();
        }

        FileReader somke_fr = new FileReader(System.getProperty("user.dir") + "/public/particle_source/" + filepath + "frame" + frameN + ".dat");
        BufferedReader smoke_bf = new BufferedReader(somke_fr);
//        FileReader fire_fr = new FileReader("E:\\Desktop\\room\\room_06_02\\trace\\frame" + frameN + ".dat");
//        BufferedReader fire_bf = new BufferedReader(fire_fr);
        int[] smoke = new int[80000];
//        int[] fire = new int[80000];
        String line1 = null;
//        String line2 = null;
        int p = 0;
        while ((line1 = smoke_bf.readLine()) != null) {
            smoke[p++] = Integer.parseInt(line1);
//            fire[p++] = Integer.parseInt(line2);
        }
        for (int k = 0; k <= maxz; k++) {
            createImage(maxx, maxy, k, frameN, smoke, filepath);
        }
        System.out.println(frameN + "  finished");
        smoke_bf.close();
    }

    public static void createImage(int maxx, int maxy, int heightN, int frameN, int[] smoke, String path) throws IOException {
        BufferedImage bi = new BufferedImage(maxx + 1, maxy + 1, BufferedImage.TYPE_INT_BGR);

        File picture = new File(System.getProperty("user.dir") + "/public/particle/" + path + "frame" + frameN + "/image" + heightN + ".png");
//        File picture = new File("E:\\Desktop\\new\\fire2\\frame" + frameN + "\\image" + heightN + ".png");
        try {
            if (picture.exists()) {
                picture.delete();
            }
            picture.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Graphics2D g = bi.createGraphics();
        bi = g.getDeviceConfiguration().createCompatibleImage(maxx + 1, maxy + 1, Transparency.TRANSLUCENT);
        g.dispose();
        g = bi.createGraphics();
        int count = heightN * (maxx + 1) * (maxy + 1);
        for (int i = 0; i <= maxx; i++) {
            for (int j = 0; j <= maxy; j++) {
                if (smoke[count] != 0) {
                    g.setColor(new Color(0, 0, 0, smoke[count]));
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
}
